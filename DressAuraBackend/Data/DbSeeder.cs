
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

                // Apply any pending migrations
                context.Database.Migrate();


            }
        }
    }
}