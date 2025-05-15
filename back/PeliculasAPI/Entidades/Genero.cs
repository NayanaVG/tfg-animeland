 using PeliculasAPI.Validaciones;
using System.ComponentModel.DataAnnotations;

namespace PeliculasAPI.Entidades
{
    public class Genero: IId
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "El campo {0} es requerido")]
        // Required: regla de validacion que funciona con asp.net core
        // {0} se va a sustituir con el nombre del campo

        [StringLength(50, ErrorMessage = "El campo {0} debe tener {1} caracteres o menos")]
        [PrimeraLetraMayuscula] // Nos permite tener acceso al valor del campo nombre

        public required string Nombre { get; set; }
        // Required: este es una caracteristica de c# que nos impide crear un genero sin su nombre
        // A nivel del codigo de c# no al nivel de una regla de validacion de la webapi
    }
}
