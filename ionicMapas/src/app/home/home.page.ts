import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

declare var google:any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map:any;
  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;

  constructor() {}
  //pegar uma posição no mapa
  public showMap(){
    const location = new google.maps.LatLng(-22.5192128,-48.5687852);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  }

  //mostrar a localização no mapa assim que o projeto abrir
  //ciclo de vida do Ionic
  ionViewDidEnter(){
    this.showMap();
  }

}
