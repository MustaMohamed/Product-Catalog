using Microsoft.EntityFrameworkCore;
using ProductCatalog.Entities.Entities;

namespace Profucts_Catalog.DataAccess
{
    public class ProductsCatalogContext : DbContext
    {
        public ProductsCatalogContext(DbContextOptions<ProductsCatalogContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
    }
}