import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
 
import * as mapboxgl from 'mapbox-gl';

interface Mardador{ 
  color: string,
  marcador?: mapboxgl.Marker,
  centro?: [number,number],
} 

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
  `.mapa-container{
    width: 100%;
    height: 100%;} 
  .list-group{
    position: fixed;
    top: 25px;
    right:50px;
    z-index:999;
    padding:30px
  }
  li{cursor:pointer;}
  .lista{color:white;}
  `
]
})
export class MarcadoresComponent implements AfterViewInit {
  @ViewChild('mapa') divMapa!:ElementRef;
  mapa!:mapboxgl.Map; 
  zoomLeave:number = 10; 
  cordenadas:[number,number] = [-99.1174195, 19.4312127]
  
  //Arreglo mapBoxgl
  marcadores:Mardador[] = []


  constructor() { }
  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.cordenadas,
      zoom: this.zoomLeave
    });
    
    this.leerMarcadoresLocalStorage()
  }
  
  agregarmarker(){
      const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
      const nuevoMarcador = new mapboxgl.Marker({
        draggable: true,
        color: color
      })
      .setLngLat(this.cordenadas)
      .addTo(this.mapa)

      this.marcadores.push({
        marcador:nuevoMarcador,
        color: color
      })
      this.guardarMarcadoresLocalStorage()
      nuevoMarcador.on('drangend',()=>{
        this.guardarMarcadoresLocalStorage()
      })
  }

  ngMarkador(marker:mapboxgl.Marker){
    this.mapa.flyTo({
      center: marker.getLngLat(), 
      zoom:19
    })

  }
  
  guardarMarcadoresLocalStorage(){
    const ltnArr:Mardador[] = []
    this.marcadores.forEach(m=>{
      const color = m.color
      const {lng,lat} = m.marcador!.getLngLat();

      ltnArr.push({
        color,
        centro:[lng,lat]
      })
    })
    localStorage.setItem('Marcadores', JSON.stringify(ltnArr));
  }
  leerMarcadoresLocalStorage(){
    if(!localStorage.getItem('Marcadores')){
      return;
    }
    else{
      const lnglaArr: Mardador[] = JSON.parse( localStorage.getItem('Marcadores')!)

      lnglaArr.forEach(m=>{

        const newMarker = new mapboxgl.Marker(
          {  
            color:  m.color,
            draggable: true
            
          })
          .setLngLat(m.centro!)
          .addTo(this.mapa)  

          this.marcadores.push({
            color: m.color,
            marcador: newMarker,
          })
          newMarker.on('dragend',()=>{
            
            this.guardarMarcadoresLocalStorage()
          })
      })
      
  }
}

borrarMarcador(i:number){
  this.marcadores[i].marcador?.remove();
  this.marcadores.splice(i,1);
  this.guardarMarcadoresLocalStorage();
}
}