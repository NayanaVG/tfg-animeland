import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

//Creamos una validacion personalizada para que la primera letra del campo nombre sea en mayuscula

export function primeraLetraMayuscula(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const valor = <string>control.value;

        if (!valor) return null; //Si el valor es indefinido o nulo
        if (valor.length === 0) return null; //Si la longitud es = 0 

        const primeraLetra = valor [0];

        if (primeraLetra !== primeraLetra.toUpperCase()){
            return {
                primeraLetraMayuscula: {
                    mensaje: 'La primera letra debe ser mayúscula'
                }
            }
        }

        return null;
    }
}

//Validación para la fecha de nacimiento

export function fechaNoPuedeSerFutura(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const fechaEscogidaPorElUsuario = new Date(control.value);
        const hoy = new Date();

        if (fechaEscogidaPorElUsuario > hoy){
            return {
                futuro: {mensaje: 'La fecha no puede ser del futuro'}
            } 
        }
        return null;
    }
}