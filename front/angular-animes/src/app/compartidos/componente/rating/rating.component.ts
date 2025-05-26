import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-rating',
  imports: [MatIconModule, NgClass],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css'
})
export class RatingComponent implements OnInit{
  ngOnInit(): void {
    this.ratingAnterior = this.ratingSeleccionado;
  }

  //Puntacion max que permitimos realizar al usuario
  @Input({required: true, transform: (valor: number) => Array(valor).fill(0)})
  maximoRating! : number[];

  //Guarda la puntuacion seleccionada por el usuario
  @Input()
  ratingSeleccionado = 0;

  @Output()
  votado = new EventEmitter<number>();

  ratingAnterior = 0;

  manejarMouseEnter(indice: number){
    this.ratingSeleccionado = indice + 1;
  }

  manejarMouseLeave(){
    if (this.ratingAnterior !== 0){
      this.ratingSeleccionado = this.ratingAnterior;
      // Si retira el cursor de las estrellas se mantiene la puntuacion que habia otorgado anteriormente el user
    } else {
      this.ratingSeleccionado = 0;
    }
  } 

  manejarClick(indice: number){
    this.ratingSeleccionado = indice + 1;
    // Cuando el user haga click se cambia el valor de ratingAnterior
    this.ratingAnterior = this.ratingSeleccionado;
    this.votado.emit(this.ratingSeleccionado);
  }
}
