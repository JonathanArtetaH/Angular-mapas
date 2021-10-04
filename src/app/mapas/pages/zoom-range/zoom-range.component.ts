import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `.mapa-container{
    width: 100%;
    height: 100%;} 

    .row{background-color: white;
         bottom: 50px;
         z-index:999;
         position:fixed;
         left:50px;
         padding:10px;
         border-radius:10px;
         border: 1px solid black;
         width: 360px;
        }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit {
  @ViewChild('mapa') divMapa!:ElementRef;
  mapa!:mapboxgl.Map; 
  zoomLeave:number = 10; 
  
  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-99.1174195, 19.4312127],
      zoom: this.zoomLeave
    });

    this.mapa.on('zoom',(event)=>{
    this.zoomLeave = this.mapa.getZoom();
    });
    this.mapa.on('zoomend',(event)=>{
      if(this.mapa.getZoom() > 19){
        this.mapa.zoomTo(19)
      }
      })
  }

  zoomInt(){
    this.mapa.zoomIn()
  }
  
  zoomOut(){
    this.mapa.zoomOut()
  }
  zoomCambio(zoomInput: string){
    this.mapa.zoomTo(Number(zoomInput))

  }

}
