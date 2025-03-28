using System.ComponentModel.DataAnnotations;

namespace DressAuraBackend.Models.DTOs
{
    public class ProductRequestDTO
    {
        public string Name { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public string? ImageUrl { get; set; }
        public string? Size { get; set; }
        public string? Color { get; set; }
        public int? StockQuantity { get; set; }
        public int? CategoryId { get; set; }
    }
}
