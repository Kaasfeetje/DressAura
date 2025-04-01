using DressAuraBackend.BrandService.Models;
using DressAuraBackend.Data;
using DressAuraBackend.ImageService.Models;
using DressAuraBackend.ProductService.DTOs;
using DressAuraBackend.ProductService.Models;
using Microsoft.EntityFrameworkCore;

namespace DressAuraBackend.ProductService
{
    public interface IProductService
    {
        Task<Product> CreateProduct(ProductRequestDTO productRequest);
    }

    public class ProductService : IProductService
    {
        private readonly ApiContext _context;

        public ProductService(ApiContext context)
        {
            _context = context;
        }

        public async Task<Product> CreateProduct(ProductRequestDTO productRequest)
        {
            var product = new Product
            {
                Name = productRequest.Name,
                Description = productRequest.Description,
                Price = productRequest.Price,
                StockQuantity = productRequest.StockQuantity
            };

            // _context.Products.Add(product);

            // Step 2: Handle Brand
            if (!string.IsNullOrEmpty(productRequest.Brand))
            {
                var brand = await _context.Brands
                    .FirstOrDefaultAsync(b => b.Name == productRequest.Brand);

                if (brand == null)
                {
                    brand = new Brand { Name = productRequest.Brand };
                    _context.Brands.Add(brand);
                    await _context.SaveChangesAsync();
                }

                product.BrandId = brand.Id;
            }

            // Step 3: Handle Category
            if (!string.IsNullOrEmpty(productRequest.Category))
            {
                var category = await _context.Categories
                    .FirstOrDefaultAsync(c => c.Name == productRequest.Category);

                if (category == null)
                {
                    category = new Category { Name = productRequest.Category };
                    _context.Categories.Add(category);
                    await _context.SaveChangesAsync();
                }

                product.CategoryId = category.Id;
            }

            // Step 4: Handle Thumbnail Image
            var thumbnailImage = await _context.Images
                .FirstOrDefaultAsync(img => img.ImageUrl == productRequest.ThumbnailImage);

            if (thumbnailImage == null)
            {
                thumbnailImage = new Image { ImageUrl = productRequest.ThumbnailImage };
                _context.Images.Add(thumbnailImage);
                await _context.SaveChangesAsync();
            }

            product.ThumbnailImageId = thumbnailImage.Id;

            // Step 5: Handle additional images (if any)
            if (productRequest.Images != null && productRequest.Images.Length > 0)
            {
                var images = productRequest.Images.Select(imageUrl => new Image { ImageUrl = imageUrl }).ToList();
                _context.Images.AddRange(images);
                await _context.SaveChangesAsync();

                product.Images = images;
            }

            // Step 6: Handle Colors (if any)
            var colorIds = new List<int>();
            if (productRequest.Colors != null && productRequest.Colors.Length > 0)
            {

                foreach (var colorRequest in productRequest.Colors)
                {
                    var existingColor = await _context.Colors
                        .FirstOrDefaultAsync(c => c.Name == colorRequest.Name && c.HexValue == colorRequest.HexValue);

                    if (existingColor != null)
                    {
                        colorIds.Add(existingColor.Id);
                    }
                    else
                    {
                        var newColor = new Color
                        {
                            Name = colorRequest.Name,
                            HexValue = colorRequest.HexValue
                        };

                        _context.Colors.Add(newColor);
                        await _context.SaveChangesAsync();
                        colorIds.Add(newColor.Id);
                    }
                }


            }

            // Step 7: Handle Sizes (if any)
            var sizeIds = new List<int>();
            if (productRequest.Sizes != null && productRequest.Sizes.Length > 0)
            {

                foreach (var sizeName in productRequest.Sizes)
                {
                    var existingSize = await _context.Sizes
                        .FirstOrDefaultAsync(s => s.Name == sizeName);

                    if (existingSize != null)
                    {
                        sizeIds.Add(existingSize.Id);
                    }
                    else
                    {
                        var newSize = new Size
                        {
                            Name = sizeName
                        };

                        _context.Sizes.Add(newSize);
                        await _context.SaveChangesAsync();
                        sizeIds.Add(newSize.Id);
                    }
                }


            }

            // Step 8: Save the product to the database
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            // Colors
            var productColors = colorIds.Select(colorId => new ProductColor
            {
                ProductId = product.Id,
                ColorId = colorId
            }).ToList();

            _context.ProductColors.AddRange(productColors);
            await _context.SaveChangesAsync();

            product.ProductColors = productColors;

            // Sizes
            var productSizes = sizeIds.Select(sizeId => new ProductSize
            {
                ProductId = product.Id,
                SizeId = sizeId
            }).ToList();

            _context.ProductSizes.AddRange(productSizes);
            await _context.SaveChangesAsync();

            product.ProductSizes = productSizes;

            // Step 9: Return the created product (including all relations)
            return product;
        }

    }

}