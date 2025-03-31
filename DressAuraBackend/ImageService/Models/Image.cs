
using DressAuraBackend.ProductService.Models;

namespace DressAuraBackend.ImageService.Models
{
    public class Image
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }
        public string? FileName { get; set; }
        public string? FilePath { get; set; }
        public string? ContentType { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }

    }
}
