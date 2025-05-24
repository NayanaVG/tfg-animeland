namespace PeliculasAPI.DTOs
{
    public class RespuestaAutenticacionDTO
        // Datos de salida
    {
        public required string Token { get; set; }
        public DateTime Expiracion { get; set; }
    }
}
