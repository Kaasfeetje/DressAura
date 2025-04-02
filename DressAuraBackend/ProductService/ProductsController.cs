using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DressAuraBackend.Data;
using Microsoft.AspNetCore.Authorization;
using DressAuraBackend.ProductService.DTOs;
using DressAuraBackend.ProductService.Models;
using AutoMapper;

namespace DressAuraBackend.ProductService
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApiContext _context;
        private readonly IMapper _mapper;

        private readonly IProductService _productService;


        public ProductsController(ApiContext context, IMapper mapper, IProductService productService)
        {
            _context = context;
            _mapper = mapper;
            _productService = productService;
        }

        // GET: api/products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductResponseDTO[]>>> GetProducts()
        {
            var products = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.Category)
                .Include(p => p.ThumbnailImage)
                .ToListAsync();

            var productResponseDto = _mapper.Map<ProductResponseDTO[]>(products);
            return Ok(productResponseDto);
        }

        // GET: api/products/{name}
        [HttpGet("{name}")]
        public async Task<ActionResult<Product>> GetProductByName(string name)
        {
            var product = await _context.Products
                .Include(p => p.Brand)
                .Include(p => p.Category)
                .Include(p => p.ThumbnailImage)
                .Include(p => p.Images)
                .Include(p => p.ProductColors)
                .ThenInclude(pc => pc.Color)
                .Include(p => p.ProductSizes)
                .ThenInclude(ps => ps.Size)
                .FirstOrDefaultAsync(p => p.Name == name);

            if (product == null)
            {
                return NotFound();
            }

            var productResponseDto = _mapper.Map<ProductResponseDTO>(product);
            return Ok(productResponseDto);
        }

        // POST: api/products
        [HttpPost]
        public async Task<ActionResult<ProductResponseDTO>> PostProduct(ProductRequestDTO productRequest)
        {
            var product = await _productService.CreateProduct(productRequest);

            var productResponseDto = _mapper.Map<ProductResponseDTO>(product);
            return CreatedAtAction("GetProductByName", new { name = product.Name }, productResponseDto);
        }

        // PUT: api/products/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Products.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/products/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
