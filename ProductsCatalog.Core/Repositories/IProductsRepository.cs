using System.Collections.Generic;
using ProductCatalog.Core.Core;
using ProductCatalog.Entities.Entities;

namespace ProductCatalog.Core.Repositories
{
    public interface IProductsRepository : IRepository<Product>
    {
    }
}