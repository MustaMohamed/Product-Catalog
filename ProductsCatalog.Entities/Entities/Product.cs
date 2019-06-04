using System;

namespace ProductCatalog.Entities.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public long Price { get; set; }
        public long BoughtByCounter { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}