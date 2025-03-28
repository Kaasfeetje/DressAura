
using DressAuraBackend.Models;
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

                // Apply any pending migrations
                context.Database.Migrate();

                if (!context.Categories.Any())
                {
                    context.Categories.AddRange(
                        new Category
                        {
                            Name = "Shirts"
                        },
                        new Category
                        {
                            Name = "Pants"
                        },
                        new Category
                        {
                            Name = "Dresses"
                        },
                        new Category
                        {
                            Name = "Shoes"
                        }
                    );
                    context.SaveChanges();
                }

                // Check if the database is empty, and if so, seed it
                if (!context.Products.Any())
                {
                    var dressCategory = context.Categories.FirstOrDefault(c => c.Name == "Dresses");
                    var shirtsCategory = context.Categories.FirstOrDefault(c => c.Name == "Shirts");
                    if (dressCategory != null && shirtsCategory != null)
                    {
                        context.Products.AddRange(
                            new Product
                            {
                                Name = "Stylish Dress",
                                Description = "A beautiful, elegant dress for all occasions.",
                                Price = 49.99m,
                                Size = "M",
                                Color = "Red",
                                StockQuantity = 100,
                                CategoryId = dressCategory.Id
                            },
                            new Product
                            {
                                Name = "Casual Shirt",
                                Description = "A comfortable shirt for daily wear.",
                                Price = 29.99m,
                                Size = "L",
                                Color = "Blue",
                                StockQuantity = 150,
                                CategoryId = shirtsCategory.Id
                            }
                        );

                        context.SaveChanges();
                    }
                }
            }
        }
    }
}