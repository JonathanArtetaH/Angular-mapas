 
import { Component   } from '@angular/core'; 

interface MenuItem{
  ruta:string,
  nombre:string
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
    li{cursor:pointer;}
    `
  ]
})
export class MenuComponent  {
 menuItem:MenuItem[]=[
   {ruta:'/mapas/fullscreen',nombre:'Full Screen'},
   {ruta:'/mapas/zoomrange',nombre:'Zoom range'},
   {ruta:'/mapas/marcadores',nombre:'Marcadores'},
   {ruta:'/mapas/propiedades',nombre:'Propiedades'},
 ]
}
