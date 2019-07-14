using System.Collections.Generic;
using ProductCatalog.Core.Core;
using ProductCatalog.Entities.Entities;

namespace ProductCatalog.Core.Services
{
    public interface IProductsService : IService
    {
        IEnumerable<Product> GetAllProducts();
        IEnumerable<Product> SearchForProducts(string productName);
        IEnumerable<Product> SearchForProductsWithPagination(string productName, int? pageNumber, int? pageSize);
        Product AddProduct(Product product);
        IEnumerable<Product> GetProductsWithPagination(int? pageNumber, int? pageSize);
        long GetAllProductsCount();
        Product UpdateProduct(Product product);
        void DeleteProduct(int id);
    }
}