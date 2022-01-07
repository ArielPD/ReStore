using System.Net.Http.Headers;
using System.Text.Json;
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Http.Headers;
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
    public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery]ProductParams productParams)
    {   
        
        //string searchTerm="empty", string orderBy = "name",
        //string brands="empty", string types="empty"
        
        //return await _context.Products.ToListAsync();
        var query = _context.Products
            .Sort(productParams.OrderBy)
            .Search(productParams.SearchTerm)
            .Filter(productParams.Brands, productParams.Types)
            .AsQueryable();
   
        //return await query.ToListAsync();
        var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);
        
        Response.AddPaginationHeader(products.MetaData);
        
        return products;
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

    [HttpGet("filters")]
    public async Task<IActionResult> GetFilters()
    {
        var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
        var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();
        return Ok(new {brands, types});
    }
}