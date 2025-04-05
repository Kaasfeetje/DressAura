
using AutoMapper;
using DressAuraBackend.Data;
using DressAuraBackend.ProductService.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DressAuraBackend.CategoryService
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ApiContext _context;
        private readonly IMapper _mapper;

        private readonly ICategoriesService _categoryService;


        public CategoriesController(ApiContext context, IMapper mapper, ICategoriesService categoryService)
        {
            _context = context;
            _mapper = mapper;
            _categoryService = categoryService;
        }

        [HttpGet("{name}/products")]
        public async Task<ActionResult<IEnumerable<ProductResponseDTO[]>>> GetCategoryProducts(string name)
        {
            var categoryExists = await _context.Categories
                .AnyAsync(c => c.Name.ToLower() == name.ToLower());

            if (!categoryExists)
            {
                return NotFound(new { message = "Category not found." });
            }

            var products = await _categoryService.GetCategoryProducts(name);
            var productResponseDto = _mapper.Map<ProductResponseDTO[]>(products);
            return Ok(productResponseDto);
        }
    }
}