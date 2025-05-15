import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { toBase64 } from '../../funciones/toBase64';
import { validateHorizontalPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-input-img',
  imports: [MatButtonModule],
  templateUrl: './input-img.component.html',
  styleUrl: './input-img.component.css'
})
export class InputImgComponent {

  @Input({required: true}) //El titulo es un parametro del componente requerido
  titulo!: string;

  @Input()
  urlImagenActual?: string;

  @Output()
  archivoSeleccionado = new EventEmitter<File>();

  imagenBase64?: string; //Arreglo de bits en formato string

  cambio(event: Event){
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0){
      const file: File = input.files[0];

      //Ahora lo transformamos a base64 creando una funcion 
      toBase64(file).then((valor: string) => this.imagenBase64 = valor)
      .catch(error => console.log(error));

      this.archivoSeleccionado.emit(file);
      this.urlImagenActual = undefined;
    }
  }
}
