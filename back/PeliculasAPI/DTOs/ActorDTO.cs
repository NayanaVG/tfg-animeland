using PeliculasAPI.Entidades;

namespace PeliculasAPI.DTOs
{
    public class ActorDTO: IId
    {
        public int Id { get; set; }
        public required string Nombre { get; set; }
        public DateTime FechaDeNacimiento { get; set; }
        public string? Foto { get; set; }
    }
}
