import { Component } from '@angular/core';
//importar as extensões
import { ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ILocal } from '../interfaces/ILocal';

//importante declarar uma variavel para o google
declare var google:any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //criar variaveis
  map:any;
  posicaoAtual:any;

  public listaLocais: ILocal[]= [
    {
      lat: -22.5192128, 
      lng: -48.5687852,
      titulo: "Minha coordenada"
    },
    {
      lat: -22.521723,
      lng: -48.566019,
      titulo: "Camilo Sahade"
    },
    {
      lat: -22.510089,
      lng: -48.562098,
      titulo: "José Conti"
    },
    {
      lat: -22.510862,
      lng: -48.558236,
      titulo: "Igreja Matriz"
    },
    {
      lat: -22.502249,
      lng: -48.561508,
      titulo: "Igaraçu Park"
    }
  ];

  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;

  constructor(private geolocation : Geolocation) {}

  //pegar uma posição no mapa
  public async showMap(){
    //const location = new google.maps.LatLng(-22.5192128,-48.5687852); posição Fixa
    //pegar a posição atual do mapa que está na metodo buscarPosicao
    await this.buscarPosicao();
    const options = {
      center: this.posicaoAtual,
      zoom: 15,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(this.mapRef.nativeElement, options);

   const marcador = new google.maps.Marker({
     position: this.posicaoAtual,
     map: this.map,
     title: "minha Posição Atual!",
     icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
     animation: google.maps.Animation.BOUNCE
   });

   for (let local of this.listaLocais){
     this.adicionarMArcador(local);
   }

  }

  //adicionar outras cinco posições no mapa
  private adicionarMArcador(Local: ILocal){

    //desestruturar o objeto
    const { lat, lng, titulo } = Local;

    const marcador = new google.maps.Marker({
      position: {lat, lng},
      map: this.map,
      title: titulo
    });
  }

  //mostrar a localização no mapa assim que o projeto abrir
  //ciclo de vida do Ionic
  ionViewDidEnter(){
    this.showMap();
  }
  
  public async buscarPosicao(){
    await this.geolocation.getCurrentPosition().then((posicaoGPS) => {
      //Pegar a posição no mapa através do GPS do dispositivo.
      this.posicaoAtual = {
        lat : posicaoGPS.coords.latitude,
        lng : posicaoGPS.coords.longitude 
      }
     }).catch((error) => {
       console.log('Erro ao tentar encontrar a localização', error);
     });
  }

}
