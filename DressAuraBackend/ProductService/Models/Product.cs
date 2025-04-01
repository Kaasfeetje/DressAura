using System.ComponentModel.DataAnnotations.Schema;
using DressAuraBackend.BrandService.Models;
using DressAuraBackend.ImageService.Models;
using DressAuraBackend.ProductService.DTOs;

namespace DressAuraBackend.ProductService.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int? StockQuantity { get; set; }

        public int? BrandId { get; set; }
        public Brand? Brand { get; set; }

        [ForeignKey("Category")]
        public int? CategoryId { get; set; }
        public Category Category { get; set; }

        public int ThumbnailImageId { get; set; }
        public Image ThumbnailImage { get; set; }

        public ICollection<Image> Images { get; set; }
        public ICollection<ProductColor> ProductColors { get; set; }
        public ICollection<ProductSize> ProductSizes { get; set; }

        public Product()
        {
        }
    }
}
