
using DressAuraBackend.BrandService.Models;
using DressAuraBackend.CategoryService.Models;
using DressAuraBackend.ImageService.Models;
using DressAuraBackend.ProductService.Models;
using Microsoft.EntityFrameworkCore;

namespace DressAuraBackend.Data
{
    public static class DbSeeder
    {
        public static void Seed(IServiceProvider serviceProvider, IHostEnvironment env)
        {
            using (var scope = serviceProvider.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<ApiContext>();

                context.Database.Migrate();

                if (!context.Products.Any())
                {
                    SeedProducts(context);
                }
            }
        }


        private static void SeedProducts(ApiContext context)
        {
            var brand1 = new Brand { Name = "Nike" };
            var brand2 = new Brand { Name = "Adidas" };

            var category1 = new Category { Name = "Shoes" };
            var category2 = new Category { Name = "Clothing" };

            var image1 = new Image
            {
                ImageUrl = "https://media.s-bol.com/xmGzmoGXXp4J/AR0vq9/484x1200.jpg"
            };
            var image2 = new Image
            {
                ImageUrl = "https://media.s-bol.com/BygXy1g3xrPx/AR0vq9/414x1200.jpg"
            };
            var image3 = new Image
            {
                ImageUrl = "https://media.s-bol.com/KRO7RAO30ZrJ/AR0vq9/330x1200.jpg"
            };
            var image4 = new Image
            {
                ImageUrl = "https://media.s-bol.com/BygXy1g44kYW/AR0vq9/885x1200.jpg"
            };
            var image5 = new Image
            {
                ImageUrl = "https://media.s-bol.com/DARZAwR44mV5/AR0vq9/832x1200.jpg"
            };
            var image6 = new Image
            {
                ImageUrl = "https://media.s-bol.com/JRZKREZ3Jq6v/AR0vq9/433x1200.jpg"
            };
            var image7 = new Image
            {
                ImageUrl = "https://media.s-bol.com/yn8Anp8YYqgV/AR0vq9/445x1200.jpg"
            };

            context.Images.AddRange(image1, image2, image3, image4, image5, image6, image7);

            context.SaveChanges();

            var product1 = new Product
            {
                Name = "Nike Running Shoes",
                Description = "Comfortable running shoes",
                Price = 120.00m,
                StockQuantity = 100,
                Brand = brand1,
                Category = category1,
                ThumbnailImage = image1,
                Images = new List<Image> { image1, image2, image3, image4 },
                ProductColors = new List<ProductColor>(),
                ProductSizes = new List<ProductSize>()
            };

            var product2 = new Product
            {
                Name = "Adidas T-shirt",
                Description = "Stylish Adidas T-shirt",
                Price = 30.00m,
                StockQuantity = 150,
                Brand = brand2,
                Category = category2,
                ThumbnailImage = image5,
                Images = new List<Image> { image5, image6, image7 },
                ProductColors = new List<ProductColor>(),
                ProductSizes = new List<ProductSize>()
            };

            context.Products.AddRange(product1, product2);

            context.SaveChanges();
        }

    }
}