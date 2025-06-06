import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from  '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ListadoPeliculasComponent } from "../listado-peliculas/listado-peliculas.component";
import { FiltroPeliculas } from './filtroPelicula';

import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { GeneroDTO } from '../../generos/generos';
import { PeliculaDTO } from '../peliculas';
import { GenerosService } from '../../generos/generos.service';
import { PeliculasService } from '../peliculas.service';
import { PaginacionDTO } from '../../compartidos/modelos/PaginacionDTO';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { debounce, debounceTime } from 'rxjs';

@Component({
  selector: 'app-filtro-peliculas',
  imports: [MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatCheckboxModule, 
    ListadoPeliculasComponent, MatPaginatorModule],
  templateUrl: './filtro-peliculas.component.html',
  styleUrl: './filtro-peliculas.component.css'
})
export class FiltroPeliculasComponent implements OnInit{

  generosService = inject(GenerosService);
  peliculasService = inject(PeliculasService);
  paginacion: PaginacionDTO = {pagina: 1, recordsPorPagina: 10};
  cantidadTotalRegistros!: number; 

  ngOnInit(): void {
    this.generosService.obtenerTodos().subscribe(generos => {
      this.generos = generos;

      this.leerValoresURL();
      this.buscarPeliculas(this.form.value as FiltroPeliculas);

      this.form.valueChanges
      // Cada vez que se cambie el valor del formulario entramos al debounceTime
      .pipe(
        debounceTime(300)
      )
      /* Se ejecuta el buscar después de un tiempo de espera usando debounceTime  
      Si se cambia varias veces el formulario solo se va a ejecutar según la última actualización del formulario*/
      .subscribe(valores => {
        console.log(valores);
        this.buscarPeliculas(valores as FiltroPeliculas);
        this.escribirParametrosBusquedaEnURL(valores as FiltroPeliculas);
        });
    });  
  }

  buscarPeliculas(valores: FiltroPeliculas){
    valores.pagina = this.paginacion.pagina;
    valores.recordsPorPagina = this.paginacion.recordsPorPagina;

    this.peliculasService.filtrar(valores).subscribe(respuesta => {
      this.peliculas = respuesta.body as PeliculaDTO[];
      const cabecera = respuesta.headers.get('cantidad-total-registros') as string;
      this.cantidadTotalRegistros = parseInt(cabecera, 10);
    });
  }

  escribirParametrosBusquedaEnURL(valores: FiltroPeliculas){
    let queryStrings = []; //queryStrings son los valores que colocamos en la URL

    if (valores.titulo){
      queryStrings.push(`titulo=${encodeURIComponent(valores.titulo)}`)
      //Esta funcion nos permite codificar el texto para que sea apto para estar en una URL
    }

    if (valores.generoId !== 0){
      queryStrings.push(`generoId=${valores.generoId}`);
      //No es necesario usar la funcion porque es un numero, siempre va a ser valido
    }

    if (valores.proximosEstrenos){
      queryStrings.push(`proximosEstrenos=${valores.proximosEstrenos}`);
    }

    if (valores.enCines){
      queryStrings.push(`enCines=${valores.enCines}`);
    }

    this.location.replaceState('peliculas/filtrar', queryStrings.join('&'));
  }

  leerValoresURL(){
    this.activatedRoute.queryParams.subscribe((params: any) => {
      var objeto: any = {};

      if (params.titulo){
        objeto.titulo = params.titulo;
      }

      if (params.generoId){
        objeto.generoId = Number(params.generoId);
      }

      if (params.proximosEstrenos){
        objeto.proximosEstrenos = params.proximosEstrenos;
      }

      if (params.enCines){
        objeto.enCines = params.enCines;
      }

      this.form.patchValue(objeto);
    })
  }

  limpiar(){
    this.form.patchValue({titulo: '', generoId: 0, proximosEstrenos: false, enCines:false});
  }

  actualizarPaginacion(datos: PageEvent){
    this.paginacion = {pagina: datos.pageIndex + 1, recordsPorPagina: datos.pageSize};
    this.buscarPeliculas(this.form.value as FiltroPeliculas);
  }

  private formBuilder = inject(FormBuilder);
  private location = inject(Location); //Para poder modificar la URL
  private activatedRoute = inject(ActivatedRoute);

  form = this.formBuilder.group({
    titulo: '',
    generoId: 0,
    proximosEstrenos: false, 
    enCines: false
  })

  generos!: GeneroDTO[];
    
  peliculas!: PeliculaDTO[];

}
