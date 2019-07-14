using System.Collections.Generic;
using System.Linq;
using ProductCatalog.Core.Core;
using ProductCatalog.Core.Repositories;
using ProductCatalog.Core.Services;
using ProductCatalog.Entities.Entities;
using Profucts_Catalog.Services.Base;

namespace Profucts_Catalog.Services.Services
{
    public class ProductsService : BaseService, IProductsService
    {
        private readonly IProductsRepository _productsRepository;
        private readonly IUnitOfWork _unitOfWork;

        public ProductsService(IProductsRepository productRepository, IUnitOfWork unitOfWork)
        {
            this._productsRepository = productRepository;
            this._unitOfWork = unitOfWork;
        }

        public IEnumerable<Product> GetAllProducts()
        {
            return this._productsRepository.GetAll();
        }

        public IEnumerable<Product> SearchForProducts(string productName)
        {
            return _productsRepository.GetAll().Where(p => p.Name.ToLower().Contains(productName.ToLower()));
        }

        public IEnumerable<Product> SearchForProductsWithPagination(string productName, int? pageNumber, int? pageSize)
        {
            var productsQueryable = this.SearchForProducts(productName);
            var skipCount = (pageSize ?? 5) * ((pageNumber ?? 1) - 1);
            var products = productsQueryable.Skip(skipCount).Take(pageSize ?? 5).AsEnumerable();
            return products;
        }

        public Product AddProduct(Product product)
        {
            this._productsRepository.Add(product);
            this._unitOfWork.Complete();
            return product;
        }

        public IEnumerable<Product> GetProductsWithPagination(int? pageNumber, int? pageSize)
        {
            var productsQueryable = _productsRepository.GetAll();
            var skipCount = (pageSize ?? 5) * ((pageNumber ?? 1) - 1);
            var products = productsQueryable.Skip(skipCount).Take(pageSize ?? 5).AsEnumerable();
            return products;
        }

        public long GetAllProductsCount()
        {
            return this._productsRepository.GetCount();
        }

        public Product UpdateProduct(Product newProduct)
        {
            var product = this._productsRepository.Update(newProduct);
            this._unitOfWork.Complete();
            return product;
        }

        public void DeleteProduct(int id)
        {
            var product = this._productsRepository.Get(id);
            this._productsRepository.Delete(product);
            this._unitOfWork.Complete();
        }
    }
}