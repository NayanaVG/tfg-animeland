using PeliculasAPI.DTOs;

namespace PeliculasAPI.Utilidades
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> Paginar<T>(this IQueryable<T> queryable, PaginacionDTO paginacion)
        {
            return queryable
                .Skip((paginacion.Pagina - 1) * paginacion.RecordsPorPagina)
                /* Usamos esta formula para saltarnos los registros necesarios segun la pagina en la que estemos
                (2-1)*5=5 asi en la pagina 2 nos saltamos los primeros 5 registros */

                .Take(paginacion.RecordsPorPagina); 
                // Tomamos la cantidad de registros que sea igual a RecordsPorPagina
        }
    }
}
