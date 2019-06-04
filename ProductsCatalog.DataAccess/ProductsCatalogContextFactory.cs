using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Profucts_Catalog.DataAccess
{
    public class ProductsCatalogContextFactory : IDesignTimeDbContextFactory<ProductsCatalogContext>
    {
        public ProductsCatalogContext CreateDbContext(string[] args)
        {
            string projectPath =
                AppDomain.CurrentDomain.BaseDirectory.Split(new String[] {@"bin\"}, StringSplitOptions.None)[0];
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(projectPath + "..\\Products Catalog/")
                .AddJsonFile("appsettings.json")
                .Build();

            var connectionString = configuration.GetConnectionString("ProductsDatabase");

            var optionsBuilder = new DbContextOptionsBuilder<ProductsCatalogContext>();
            optionsBuilder.UseSqlServer(connectionString);

            return new ProductsCatalogContext(optionsBuilder.Options);
        }
    }
}