using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ProductCatalog.Core.Services;
using ProductCatalog.Entities.Entities;
using Profucts_Catalog.Controllers.ViewModels;

namespace Profucts_Catalog.Controllers
{
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        private IProductsService _productsService;

        public ProductsController(IProductsService productsService)
        {
            this._productsService = productsService;
        }

        // GET
        [HttpGet("[action]")]
        public IActionResult All()
        {
            var products = this._productsService.GetAllProducts();
            return Json(new ProductsViewModel {Products = products, Count = products.Count()});
        }

        [HttpPost("[action]")]
        public IActionResult Add([FromBody] Product product)
        {
            var _product = this._productsService.AddProduct((Product) product);
            return Json(_product);
        }

        [HttpGet("[action]")]
        public IActionResult WithPagination([FromQuery] int? pageNumber = 1, [FromQuery] int? pageSize = 5)
        {
            var products = this._productsService.GetProductsWithPagination(pageNumber, pageSize);
            var allProductsCount = this._productsService.GetAllProductsCount();
            return Json(new ProductsViewModel {Products = products, Count = allProductsCount});
        }

        [HttpPut("[action]")]
        public IActionResult UpdateProduct([FromBody] Product newProduct)
        {
            var product = this._productsService.UpdateProduct(newProduct);
            return Json(product);
        }

        [HttpPost("[action]")]
        public void DeleteProduct([FromQuery] int id)
        {
            this._productsService.DeleteProduct(id);
        }
    }
}