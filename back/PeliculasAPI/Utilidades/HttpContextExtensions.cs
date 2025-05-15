using Microsoft.EntityFrameworkCore;

namespace PeliculasAPI.Utilidades
{
    public static class HttpContextExtensions
    {
        public async static Task InsertarParametrosPaginacionEnCabecera<T>(this HttpContext httpContext,
            IQueryable<T> queryable)
            /* Con this Httpcontext decimos que queremos agregar este metodo a HttpContext para asi poder a
            traves de una instancia de HttpContext utilizar este metodo
            IQueryable es un tipo que indica un objeto al cual le podemos hacer querys 
            <T> significa que puede ser de cualquier entidad (generos, actores...) */

        {
            if (httpContext is null)
            {
                throw new ArgumentNullException(nameof(httpContext));
            }
            double cantidad = await queryable.CountAsync();
            httpContext.Response.Headers.Append("cantidad-total-registros", cantidad.ToString());
        }
    }
}
