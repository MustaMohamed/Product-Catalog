using Microsoft.AspNetCore.Mvc;
using ProductCatalog.Core.Services;
using ProductCatalog.Entities.Entities;

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
            return Json(products);
        }

        [HttpPost("[action]")]
        public IActionResult Add([FromBody]Product product)
        {
            var _product = this._productsService.AddProduct((Product)product);
            return Json(_product);
        }
    }
}