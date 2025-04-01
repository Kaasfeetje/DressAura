
namespace DressAuraBackend.ProductService.DTOs
{
    public class ProductRequestDTO
    {
        public string Name { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int? StockQuantity { get; set; }
        public string? Brand { get; set; }
        public string? Category { get; set; }
        public string ThumbnailImage { get; set; }
        public string[]? Images { get; set; }
        public ColorRequestDTO[]? Colors { get; set; }
        public string[]? Sizes { get; set; }
    }
}
