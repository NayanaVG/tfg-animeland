import { Component, inject, Input, input, numberAttribute, OnInit } from '@angular/core';
import { FormularioGeneroComponent } from "../formulario-genero/formulario-genero.component";
import { GenerosService } from '../generos.service';
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';
import { EditarEntidadComponent } from "../../compartidos/componentes/editar-entidad/editar-entidad.component";

@Component({
  selector: 'app-editar-genero',
  imports: [EditarEntidadComponent],
  templateUrl: './editar-genero.component.html',
  styleUrl: './editar-genero.component.css',
  providers: [
    {provide: SERVICIO_CRUD_TOKEN, useClass: GenerosService}
  ]
})
export class EditarGeneroComponent {
  
  @Input({transform: numberAttribute}) //Nos permite transformar el valor que voy a recibir en un numero
  id!: number; //Con la ! indico que no hay que inicializarlo 
  formularioGenero = FormularioGeneroComponent;

}
