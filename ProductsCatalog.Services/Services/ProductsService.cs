using System.Collections.Generic;
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


        public Product AddProduct(Product product)
        {
            this._productsRepository.Add(product);
            this._unitOfWork.Complete();
            return product;
        }
    }
}