using Microsoft.EntityFrameworkCore;
using ProductCatalog.Core.Repositories;
using ProductCatalog.Entities.Entities;
using ProductCatalog.Repositories.Base;

namespace ProductCatalog.Repositories.Repositories
{
    public class UserRepository<T> : BaseRepository<User>, IUserRepository
    {
        public UserRepository(DbContext context) : base(context)
        {
        }
    }
}