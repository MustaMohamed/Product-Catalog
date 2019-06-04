using System.Collections.Generic;
using ProductCatalog.Core.Core;
using ProductCatalog.Entities.Entities;

namespace ProductCatalog.Core.Services
{
    public interface IProductsService : IService
    {
        IEnumerable<Product> GetAllProducts();
        Product AddProduct(Product product);
        IEnumerable<Product> GetProductsWithPagination(int? pageNumber, int? pageSize);
        long GetAllProductsCount();
    }
}