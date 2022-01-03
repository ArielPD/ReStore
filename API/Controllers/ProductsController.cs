using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class ProductsController : BaseApiController
{

    private readonly StoreContext _context;
    
    public ProductsController(StoreContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetProducts()
    {
        return await _context.Products.ToListAsync();
    }
    
    /*[HttpGet]
    public  ActionResult<List<Product>> GetProducts()
    {
        var products = context.Products.ToList();
        return Ok(products);
    }*/

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product =  await _context.Products.FindAsync(id);

        if (product == null) return new NotFoundResult();
        return product;
    }
}