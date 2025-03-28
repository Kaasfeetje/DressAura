using Microsoft.EntityFrameworkCore;
using DressAuraBackend.Models;

namespace DressAuraBackend.Data
{
    public class ApiContext : DbContext
    {
        public ApiContext(DbContextOptions<ApiContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
    }
}
