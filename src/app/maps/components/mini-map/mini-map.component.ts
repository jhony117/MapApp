import { AfterViewInit, Component, ElementRef, Input, ViewChild,   } from '@angular/core';

import { Map, Marker } from 'mapbox-gl';
import { MarkersPageComponent } from '../../pages/markers-page/markers-page.component';


@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit {



  @ViewChild('map')divMap?: ElementRef ;

  @Input() lngLat?: [number,number];


 ngAfterViewInit() {

  if (!this.divMap?.nativeElement) throw 'Map Div not found';
  if (!this.lngLat) throw "LngLAt Can't be null";


  //mapa

const map = new Map({
  container : this.divMap.nativeElement,
  style: 'mapbox://styles/mapbox/streets-v12',
  center : this.lngLat,
  zoom : 15,
  interactive :false,
});

  //marker
  new Marker()
  .setLngLat(this.lngLat).
  addTo(map)


}
}
