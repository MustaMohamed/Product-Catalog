namespace ProductCatalog.Core.Core
{
    public interface IUnitOfWork
    {
        void Complete();
    }
}