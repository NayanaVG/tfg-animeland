import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { PeliculasService } from '../peliculas.service';
import { PeliculaDTO } from '../peliculas';
import { CargandoComponent } from "../../compartidos/componentes/cargando/cargando.component";
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Coordenada } from '../../compartidos/componentes/mapa/Coordenada';
import { MapaComponent } from "../../compartidos/componentes/mapa/mapa.component";

@Component({
  selector: 'app-detalle-pelicula',
  imports: [CargandoComponent, MatChipsModule, RouterLink, MapaComponent],
  templateUrl: './detalle-pelicula.component.html',
  styleUrl: './detalle-pelicula.component.css'
})
export class DetallePeliculaComponent implements OnInit{
  ngOnInit(): void {
    this.peliculasService.obtenerPorId(this.id).subscribe(pelicula => {
      pelicula.fechaLanzamiento = new Date(pelicula.fechaLanzamiento);
      this.pelicula = pelicula;
      this.trailerURL = this.generarURLYoutubeEmbed(pelicula.trailer);
      this.coordenadas = pelicula.cines!.map(cine => {
        return <Coordenada>{latitud: cine.latitud, longitud: cine.longitud, texto: cine.nombre}
      })
    });
  }

  @Input({transform: numberAttribute})
  id!: number;

  peliculasService = inject(PeliculasService);
  pelicula!: PeliculaDTO;
  sanitizer = inject(DomSanitizer);
  trailerURL!: SafeResourceUrl;
  coordenadas: Coordenada[] = [];

  generarURLYoutubeEmbed(url: string): SafeResourceUrl | string {
    if (!url){
      return '';
    }

    var videoId = url.split('v=')[1];
    // v= divide el string en 2, la parte anterior al id y la posterior, con el 1 escogemos la 2ª parte que si contiene el id

    var posicionAmpersand = videoId.indexOf('&');
    if (posicionAmpersand !== 1){
      videoId = videoId.substring(0, posicionAmpersand);
      // Así se elimina lo que venga después del id
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId} `)

  }
}
