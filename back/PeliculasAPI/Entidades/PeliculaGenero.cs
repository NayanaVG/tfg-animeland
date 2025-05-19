namespace PeliculasAPI.Entidades
{
    public class PeliculaGenero
    {
        public int GeneroId { get; set; }
        public int PeliculaId { get; set; }
        public Genero Genero { get; set; } = null!;
        public Pelicula Pelicula { get; set; } = null!;
        // Las propiedades de navegación nos permiten navegar entre las relaciones de las entidades
    }
}
