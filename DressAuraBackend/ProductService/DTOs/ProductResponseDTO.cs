using DressAuraBackend.BrandService.DTOs;
using DressAuraBackend.ImageService.DTOs;

namespace DressAuraBackend.ProductService.DTOs
{
    public class ProductResponseDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int? StockQuantity { get; set; }

        public int? BrandId { get; set; }
        public BrandResponseDTO? Brand { get; set; }

        public int? CategoryId { get; set; }
        public CategoryResponseDTO? Category { get; set; }

        public int? ThumbnailImageId { get; set; }
        public ImageResponseDTO? ThumbnailImage { get; set; }

        public List<ImageResponseDTO>? Images { get; set; }
        public List<ColorResponseDTO>? Colors { get; set; }
        public List<SizeResponseDTO>? Sizes { get; set; }
    }
}