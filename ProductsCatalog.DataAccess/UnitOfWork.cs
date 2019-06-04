using ProductCatalog.Core.Core;

namespace Profucts_Catalog.DataAccess
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ProductsCatalogContext _context;

        public UnitOfWork(ProductsCatalogContext context)
        {
            this._context = context;
        }

        public void Complete()
        {
            this._context.SaveChanges();
        }
    }
}