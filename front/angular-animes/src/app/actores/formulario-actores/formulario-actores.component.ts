import { Component, EventEmitter, inject, Input, OnInit, Output, output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ActorCreacionDTO, ActorDTO } from '../actores';
import moment from 'moment';
import { fechaNoPuedeSerFutura } from '../../compartidos/funciones/validaciones';
import { InputImgComponent } from "../../compartidos/componentes/input-img/input-img.component";

@Component({
  selector: 'app-formulario-actores',
  imports: [MatButtonModule, RouterLink, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatDatepickerModule, InputImgComponent],
  templateUrl: './formulario-actores.component.html',
  styleUrl: './formulario-actores.component.css'
})
export class FormularioActoresComponent implements OnInit{
  ngOnInit(): void {
      if (this.modelo !== undefined){
        this.form.patchValue(this.modelo); 
      }
  }

  private formBuilder = inject(FormBuilder);

  @Input()
  modelo?: ActorDTO;

  @Output()
  posteoFormulario = new EventEmitter<ActorCreacionDTO>();

  form = this.formBuilder.group({
    nombre: ['', {
      validators: [Validators.required]
    }],
    fechaDeNacimiento: new FormControl<Date | null>(null, {
      validators: [Validators.required, fechaNoPuedeSerFutura()]
    }), //Por que esta dentro de null el validators?
    foto: new FormControl<File | string | null>(null)
  })

  obtenerErrorCampoNombre(){
    let campo = this.form.controls.nombre;

    if (campo.hasError('required')){
      return 'El campo nombre es requerido';
    }
    return "";
  }

  obtenerErrorCampoFechaNacimiento(){
    let campo = this.form.controls.fechaDeNacimiento;

    if (campo.hasError('required')){
      return 'El campo fecha nacimiento es requerido';
    }
    if (campo.hasError('required')){
      return campo.getError('futuro').mensaje;
    }
    return "";
  }

  archivoSeleccionado(file: File){
    this.form.controls.foto.setValue(file);
  }

  guardarCambios(){
    if (!this.form.valid){
      return;
    }
    const actor = this.form.value as ActorCreacionDTO;
    console.log(actor);
    actor.fechaNacimiento = moment(actor.fechaNacimiento).toDate();
    console.log(actor.fechaNacimiento);

    if (typeof actor.foto === "string"){
      actor.foto = undefined;
    } /*Si el valor de actor.foto es una url es un string, entonces no quiero cambiar la foto.
      La colocamos como undefined para que no se mande al webapi, pero si la cambio la foto sera un archivo.
      Esta manera es mas eficiente y no gardamos 2 veces la misma img en el backend */

    this.posteoFormulario.emit(actor);
  }
}
