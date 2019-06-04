using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace ProductCatalog.Core.Core
{
    public interface IRepository<T> where T : class
    {
        long GetCount();
        long GetCount(Expression<Func<T, bool>> expression);
        T Get(int id);
        IQueryable<T> GetAll();
        T Add(T entity);
        T Update(T entity);
        void Delete(T entity);
        void Delete(int id);
    }
}