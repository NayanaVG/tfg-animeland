import { Component, Input } from '@angular/core';
import { SelectorMultipleDTO } from './SelectorMultipleModelo';

@Component({
  selector: 'app-selector-multiple',
  imports: [],
  templateUrl: './selector-multiple.component.html',
  styleUrl: './selector-multiple.component.css'
})
export class SelectorMultipleComponent {

  @Input({required: true})
  Seleccionados!: SelectorMultipleDTO[];

  @Input({required: true})
  NoSeleccionados!: SelectorMultipleDTO[];

  seleccionar(elemento: SelectorMultipleDTO, indice: number){
    this.Seleccionados.push(elemento);
    this.NoSeleccionados.splice(indice, 1);
  }

  deseleccionar(elemento: SelectorMultipleDTO, indice: number){
    this.NoSeleccionados.push(elemento);
    this.Seleccionados.splice(indice, 1);
  }

  seleccinarTodo(){
    this.Seleccionados.push(...this.NoSeleccionados);
    this.NoSeleccionados.length = 0;
  }

  delseleccionarTodo(){
    this.NoSeleccionados.push(...this.Seleccionados);
    this.Seleccionados.length = 0;
  }
}
