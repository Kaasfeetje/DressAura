
namespace DressAuraBackend.ProductService.Models
{
    public class Size
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<ProductSize> ProductSizes { get; set; }
    }
}
