using System.ComponentModel.DataAnnotations;

namespace PeliculasAPI.DTOs
{
    public class CredencialesUsuarioDTO
        // Son los datos de entrada
    {
        [EmailAddress]
        [Required]
        public required string Email { get; set; }
        [Required]
        public required string Password { get; set; }
    }
}
