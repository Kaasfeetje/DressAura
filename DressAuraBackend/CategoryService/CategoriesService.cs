using DressAuraBackend.Data;
using DressAuraBackend.ProductService.Models;
using Microsoft.EntityFrameworkCore;

namespace DressAuraBackend.CategoryService
{
    public interface ICategoriesService
    {
        Task<List<Product>> GetCategoryProducts(string name);
    }

    public class CategoriesService : ICategoriesService
    {
        private readonly ApiContext _context;

        public CategoriesService(ApiContext context)
        {
            _context = context;
        }
        public async Task<List<Product>> GetCategoryProducts(string name)
        {
            var products = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.Category)
                .Include(p => p.ThumbnailImage)
                .Where(p => p.Category.Name.ToLower() == name.ToLower())
                .ToListAsync();

            return products;
        }
    }
}