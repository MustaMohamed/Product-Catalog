using System.Collections.Generic;
using ProductCatalog.Entities.Entities;

namespace Profucts_Catalog.Controllers.ViewModels
{
    public class ProductsViewModel
    {
        public IEnumerable<Product> Products { get; set; }
        public long Count { get; set; }

        public ProductsViewModel(IEnumerable<Product> products, int count)
        {
            Products = products;
            Count = count;
        }

        public ProductsViewModel()
        {
        }
    }
}