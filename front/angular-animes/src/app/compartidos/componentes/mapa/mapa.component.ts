import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { icon, latLng, LeafletMouseEvent, marker, Marker, MarkerOptions, tileLayer } from 'leaflet';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { Coordenada } from './Coordenada';

@Component({
  selector: 'app-mapa',
  imports: [LeafletModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent implements OnInit{
  ngOnInit(): void {
      this.capas = this.coordenadasIniciales.map(valor => {
        const marcador = marker([valor.latitud, valor.longitud], this.markerOptions);

        if (valor.texto){
          marcador.bindPopup(valor.texto, {autoClose: false, autoPan: false});
        }
        return  marcador; 
      });
  }

  @Input()
  soloLectura = false;

  //Coordenada inicial
  @Input()
  coordenadasIniciales: Coordenada[] = [];

  @Output()
  coordenadaSeleccionada = new EventEmitter<Coordenada>();

  //Definimos la forma que va a tener el icono en pantalla
  markerOptions: MarkerOptions = {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/marker-icon.png',
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      shadowUrl: 'assets/marker-shadow.png'
    })
  }

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...'
      })
    ],
    zoom: 14,
    center: latLng(42.355356095020284, -3.6860104139141137)
  }

  capas: Marker<any>[] = [];
  
  manejarClick(event: LeafletMouseEvent){
    if (this.soloLectura){
      return;
    }

    const latitud = event.latlng.lat;
    const longitud = event.latlng.lng;

    this.capas = [];
    this.capas.push(marker([latitud, longitud], this.markerOptions));
    this.coordenadaSeleccionada.emit({latitud, longitud})
  }
}
