import { Component, ElementRef, ViewChild } from '@angular/core';
import { Map, LngLat, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color : string ;
   marker : Marker ;
}

interface PlainMarker{
  color :string;
  lngLat: number[]
}


@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent {

  @ViewChild('map') divMap?: ElementRef;


  public markers : MarkerAndColor[] = [];

  public map?:Map;
  public currentLngLat : LngLat = new LngLat(139.64420983025508, 35.85983935788241);

  ngAfterViewInit(): void {

   if(!this.divMap) throw 'El elemento HTML no fue encontrado'


    this.map = new Map({
      container: this.divMap?.nativeElement, // // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: 13, // starting zoom
    });


    this.readFromLocalStorage()


  //   const markerHtml = document.createElement('div');
  //   markerHtml.innerHTML= 'John '


  //  //? Creacion de un marker
  //   const marker = new Marker({
  //     // color : 'red'
  //     element : markerHtml
  //   })
  //   .setLngLat(this.currentLngLat)
  //   .addTo(this.map)





  }


  //se crean en dos metodos diferentes ya que podemos usarlos en sircustancias diferentes y el create va asociado si o si al boton
    // mientras que el add puede ir asociado a una recostruccion de localStorage


  createMarker() {

if(!this.map) return ;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
const lngLat = this.map.getCenter();
    this.addMarker(lngLat, color);
  }

addMarker(lngLat: LngLat, color: string){
if (!this.map) return;

const marker = new Marker({
  color : color,
  draggable: true
})
.setLngLat(lngLat)
.addTo(this.map);

this.markers.push({
  color :color,
  marker :marker
});
this.saveToLocalStorage();
}

deleteMarker(index:number){
  this.markers[index].marker.remove();
  this.markers.splice(index, 1);
}

flyTo(marker : Marker){

 if(!this.map) return;

  this.map.flyTo({
    zoom:14,
    center: marker.getLngLat()
  })
}

  saveToLocalStorage(){
 //? recopila las cosas mas importantes del markador de modo que sea mas factible y facil ponerlos en une locasl storage
     //*Recopila solo lo datos necesarios para su reimplementacion
   const plainMarkers : PlainMarker[] = this.markers.map( ({color , marker}) => {
    return {
      color,
      lngLat: marker.getLngLat().toArray()   //regresa el lngLat como un arreglo
    }
   } );

   localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));


  }

  readFromLocalStorage(){    //* si es null regresamos un string por que el localStorge solo recive string
   const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
   const plainMarkers : PlainMarker[] = JSON.parse(plainMarkersString);
//! Recuerda que una interface no te exige las propiedades , como si lo hace una

  plainMarkers.forEach( ({color, lngLat}) => {
    const [lng, lat] = lngLat;
    const coords = new LngLat(lng,lat);

    this.addMarker(coords, color);
  } )

  }
}
