using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Profucts_Catalog.Controllers
{
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        // GET
        [HttpGet("[action]")]
        public IActionResult All()
        {
            var products = new List<object>()
            {
                new
                {
                    name = "Product Name 1",
                    boughtByCounter = 12,
                    description =
                        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur distinctio ex laboriosam possimus sequi, similique.",
                    lastUpdated = (new DateTime()).ToShortDateString(),
                    id = 1,
                    image = "https://via.placeholder.com/100x60",
                    price = 35
                },
                new
                {
                    name = "Product Name 2",
                    boughtByCounter = 2,
                    description =
                        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur distinctio ex laboriosam possimus sequi, similique.",
                    lastUpdated = (new DateTime()).ToShortDateString(),
                    id = 2,
                    image = "https://via.placeholder.com/100x60",
                    price = 12
                },
            };

            return Json(products);
        }
    }
}