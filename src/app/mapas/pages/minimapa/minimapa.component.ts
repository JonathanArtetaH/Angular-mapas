import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-minimapa',
  templateUrl: './minimapa.component.html',
  
})
export class MinimapaComponent implements OnInit {

  @Input() lngLat:[number,number] = [0,0]

  constructor() { }

  ngOnInit(): void {
  }

}
