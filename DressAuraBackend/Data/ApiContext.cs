using Microsoft.EntityFrameworkCore;
using DressAuraBackend.ProductService.Models;
using DressAuraBackend.AuthService.Models;
using DressAuraBackend.ImageService.Models;
using DressAuraBackend.BrandService.Models;

namespace DressAuraBackend.Data
{
    public class ApiContext : DbContext
    {
        public ApiContext(DbContextOptions<ApiContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Color> Colors { get; set; }
        public DbSet<ProductColor> ProductColors { get; set; }
        public DbSet<Size> Sizes { get; set; }
        public DbSet<ProductSize> ProductSizes { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Define a unique index on the Email column
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // Product color
            modelBuilder.Entity<ProductColor>().HasKey(productColor => new { productColor.ProductId, productColor.ColorId });
            modelBuilder.Entity<ProductColor>().HasOne(productColor => productColor.Product).WithMany(product => product.ProductColors).HasForeignKey(productColor => productColor.ProductId);
            modelBuilder.Entity<ProductColor>().HasOne(productColor => productColor.Product).WithMany(color => color.ProductColors).HasForeignKey(productColor => productColor.ProductId);

            // Color
            modelBuilder.Entity<Color>().HasIndex(color => color.Name).IsUnique();

            // Product size
            modelBuilder.Entity<ProductSize>().HasKey(productSize => new { productSize.ProductId, productSize.SizeId });
            modelBuilder.Entity<ProductSize>().HasOne(productSize => productSize.Product).WithMany(product => product.ProductSizes).HasForeignKey(productSize => productSize.ProductId);
            modelBuilder.Entity<ProductSize>().HasOne(productSize => productSize.Product).WithMany(size => size.ProductSizes).HasForeignKey(productSize => productSize.ProductId);

            // Size
            modelBuilder.Entity<Size>().HasIndex(size => size.Name).IsUnique();

            // TODO: handle Ondelete etc
            // Product images
            modelBuilder.Entity<Product>().HasMany(product => product.Images).WithOne(image => image.Product).HasForeignKey(image => image.ProductId);

            // Product thumbnail
            modelBuilder.Entity<Product>().HasOne(product => product.ThumbnailImage).WithOne().HasForeignKey<Product>(product => product.ThumbnailImageId);
        }

    }
}
