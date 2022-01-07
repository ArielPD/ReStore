using System;
using System.Collections.Generic;
using System.IO.Enumeration;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;

        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet(Name="GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();

            if (basket == null) return new NotFoundResult();

            return MapBaktToDto(basket);
        }
        
        [HttpPost] // api/basket?product=3&quantity=2
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {   
            // get basket || create basket
            var basket = await RetrieveBasket();
            if (basket == null) basket = CreateBasket();
            
            //get product
            var product = await _context.Products.FindAsync(productId);
            
            if (product == null) return BadRequest(new ProblemDetails{Title="Product Not Found"});
            
            //add item
            basket.AddItem(product, quantity);
            // save changes
            var result = await _context.SaveChangesAsync() > 0;
            
            if (result) return CreatedAtRoute("GetBasket", MapBaktToDto(basket));
           
            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            // get basket
            var basket = await RetrieveBasket();
            if (basket == null) return new NotFoundResult();
            //remove item or reduce quantity
            basket.RemoveItem(productId, quantity);

            var result = await _context.SaveChangesAsync() > 0;
            if (result) return new OkResult();
            return new BadRequestResult();
        }
        
        private async Task<Basket?> RetrieveBasket()
        {
            System.Console.WriteLine("cookie test");
            System.Console.WriteLine(Request.Cookies["buyerId"]);
            return  await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                //.FirstOrDefaultAsync();
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
           
        }
        
        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions {IsEssential = true, Expires = DateTime.Now.AddDays(30)};
            
           Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            
            var basket = new Basket {BuyerId = buyerId};
            _context.Baskets.Add(basket);
            return basket;
        }
        
        private BasketDto MapBaktToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };
        }
    }
}