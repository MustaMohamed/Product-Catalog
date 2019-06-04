using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using ProductCatalog.Core.Repositories;
using ProductCatalog.Entities.Entities;
using ProductCatalog.Repositories.Base;
using Profucts_Catalog.DataAccess;

namespace ProductCatalog.Repositories.Repositories
{
    public class ProductsRepository : BaseRepository<Product>, IProductsRepository
    {
        public ProductsRepository(ProductsCatalogContext context) : base(context)
        {
        }

        public Product Get(int id)
        {
            var product = this.Entities.SingleOrDefault(p => p.Id == id);
            return product;
        }

        public void Delete(int id)
        {
            var product = this.Entities.SingleOrDefault(p => p.Id == id);
            this.Entities.Remove(product);
        }
    }
}