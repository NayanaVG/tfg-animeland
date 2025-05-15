import { Component, Input, numberAttribute } from '@angular/core';
import { PeliculaCreacionDTO, PeliculaDTO } from '../peliculas';
import { FormularioPeliculasComponent } from "../formulario-peliculas/formulario-peliculas.component";
import { SelectorMultipleDTO } from '../../compartidos/componentes/selector-multiple/SelectorMultipleModelo';
import { actorAutoCompleteDTO } from '../../actores/actores';

@Component({
  selector: 'app-editar-pelicula',
  imports: [FormularioPeliculasComponent],
  templateUrl: './editar-pelicula.component.html',
  styleUrl: './editar-pelicula.component.css'
})
export class EditarPeliculaComponent {
  @Input({transform: numberAttribute})
  id!: number;

  pelicula: PeliculaDTO = {id: 1, titulo: 'Spiderman', trailer: 'ABC', fechaLanzamiento: new Date('2018-07-25'), poster:'https://upload.wikimedia.org/wikipedia/en/thumb/2/21/Web_of_Spider-Man_Vol_1_129-1.png/240px-Web_of_Spider-Man_Vol_1_129-1.png'}

  generosSeleccionados: SelectorMultipleDTO[] = [
    {llave: 2, valor: 'Acción'}
  ];

  generosNoSeleccionados: SelectorMultipleDTO[] = [
    {llave: 1, valor: 'Drama'},
    {llave: 2, valor: 'Comedia'}
  ];

  cinesSeleccionados: SelectorMultipleDTO[] = [
    {llave: 2, valor: 'Blue'},
  ];

  cinesNoSeleccionados: SelectorMultipleDTO[] = [
    {llave: 1, valor: 'Agora'},    
    {llave: 3, valor: 'Acrópolis'}
  ];

  actoresSeleccionados: actorAutoCompleteDTO[] = [
    {id: 2, nombre: 'Jennifer Aniston', personaje: 'Rachel Green', foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/JenniferAnistonHWoFFeb2012.jpg/250px-JenniferAnistonHWoFFeb2012.jpg'},
  ] 

  guardarCambios(pelicula: PeliculaCreacionDTO){
    console.log('editando película', pelicula);
  }
}
