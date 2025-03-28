using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DressAuraBackend.Models.DTOs;

namespace DressAuraBackend.Models
{
    public class Product
    {
        public int Id { get; set; }  // Unique identifier for the product
        public string Name { get; set; }  // Name of the product
        public string? Description { get; set; }  // Description of the product
        public decimal Price { get; set; }  // Price of the product
        public string? ImageUrl { get; set; }  // URL for the product image
        public string? Size { get; set; }  // Size (S, M, L, XL, etc.)
        public string? Color { get; set; }  // Color of the product
        public int? StockQuantity { get; set; }  // Available quantity in stock
        [ForeignKey("Category")]
        public int? CategoryId { get; set; }  // Foreign key to Category
        public Category Category { get; set; }  // Navigation property to Category

        public Product()
        {
        }

        public Product(ProductRequestDTO productRequestDTO, Category category)
        {
            Name = productRequestDTO.Name;
            Description = productRequestDTO.Description;
            Price = productRequestDTO.Price;
            ImageUrl = productRequestDTO.ImageUrl;
            Size = productRequestDTO.Size;
            Color = productRequestDTO.Color;
            StockQuantity = productRequestDTO.StockQuantity;
            CategoryId = productRequestDTO.CategoryId;
            Category = category;
        }
    }
}
