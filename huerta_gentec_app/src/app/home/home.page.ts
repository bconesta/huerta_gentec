import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service'
import { Router } from '@angular/router'
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { LanguageService } from '../servicios/language.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})


export class HomePage implements OnInit {

  constructor(
    private authService : AuthService,
    public router : Router,
    public db:AngularFireDatabase,
    private leng : LanguageService
    ) { 
    
  }

  lenguaje : string = "en"
  public imgcentro = '../../assets/imgs/phomeCENTRAL.png';
  public textplanta = "PLANTA";
  public rutausuario = '';
  plantys : any;
  cantidad : number;
  selector : number = 0;

  nombre : string;
  tipo : string;
  hum : any;
  luz: any;
  temp : any;

  /*
  getData(){
    this.reference=firebase.database().ref(/Prueba)
    this.
  }
  */
  back(){
    this.authService.logout().then(res =>{
      this.router.navigate(['/']);
    }).catch(err => alert('Los datos son incorrectos'))

  }

  //LECTURA RUTAS
  getRutaUser(){
    this.db.database.ref('/Users').on('value', (snapshot)=>{
     this.rutausuario = snapshot.val();
     console.log(this.rutausuario)
    })
  }

  //TEST LEER DATOS
  /*getData(){
    this.db.database.ref('/Users/9BkSKMNQu3d8curVqKa97bikVlt1/').on('value', (snapshot)=> {
      this.plantys = snapshot.val();
      this.getPlantys();
    });
  }*/
  
  new(){
    this.router.navigate(['/add/type'])
  }


  getPlantys(){
    this.nombre = "Promedio"
    this.hum = this.plantys['Slave01'].values.hum;
    this.hum = this.hum + this.plantys['Slave02'].values.hum;
    this.hum = this.hum + this.plantys['Slave03'].values.hum;
    this.hum = this.hum + this.plantys['Slave04'].values.hum;
    this.hum = this.hum + this.plantys['Slave05'].values.hum;
    this.hum = this.hum + this.plantys['Slave06'].values.hum;
    this.hum = this.hum + this.plantys['Slave07'].values.hum;
    this.hum = this.hum + this.plantys['Slave08'].values.hum;
    this.hum = this.hum + this.plantys['Slave09'].values.hum;
    this.hum = this.hum + this.plantys['Master'].values.hum;
    this.hum = this.hum/10;
    document.getElementById("humedadtext").innerHTML = this.hum.toFixed(1) + "%";
    (document.getElementById("humedad") as any).value  = this.hum/100;
    (document.getElementById("icono_agua") as any).style = "left:" + (0.6*this.hum+5) + "%;";

    this.nombre = "Promedio"
    this.temp = this.plantys['Slave01'].values.temp;
    this.temp = this.temp + this.plantys['Slave02'].values.temp;
    this.temp = this.temp + this.plantys['Slave03'].values.temp;
    this.temp = this.temp + this.plantys['Slave04'].values.temp;
    this.temp = this.temp + this.plantys['Slave05'].values.temp;
    this.temp = this.temp + this.plantys['Slave06'].values.temp;
    this.temp = this.temp + this.plantys['Slave07'].values.temp;
    this.temp = this.temp + this.plantys['Slave08'].values.temp;
    this.temp = this.temp + this.plantys['Slave09'].values.temp;
    this.temp = this.temp + this.plantys['Master'].values.temp;
    this.temp = this.temp/10;
    document.getElementById("temperaturatext").innerHTML = this.temp.toFixed(1) + "°C";
    (document.getElementById("temperatura") as any).value  = (this.temp+40)/100;
    (document.getElementById("icono_temp") as any).style = "left:" + ((0.6*this.temp+5)+22) + "%;";

    if(this.plantys['Slave01'].en == true){
      (document.getElementById("on-chip-id") as any).color = "success";
      (document.getElementById("on-label-id") as any).color = "success";
      (document.getElementById("on-label-id") as any).innerHTML = "Encendido";
    }
    else{
      (document.getElementById("on-chip-id") as any).color = "danger";
      (document.getElementById("on-label-id") as any).color = "danger";
      (document.getElementById("on-label-id") as any).innerHTML = "Apagado";
    }

    this.textplanta = this.nombre;
  }
/*
  changeImgD(){
    this.selector = this.selector+1;
    if(this.selector>(this.cantidad-1)){
      this.selector=0;
    }
    this.getPlantys();
  }

  changeImgI(){
    this.selector = this.selector-1;
    if(this.selector<0){
      this.selector=this.cantidad-1;
    }
    this.getPlantys();
  }
*/


  logout : string;

  ngOnInit() {
    //this.lenguaje = this.leng.getLanguage();
    this.logout = this.leng.language[this.leng.value].HomePage.logout;
  }
  ionViewDidEnter(){
    this.db.database.ref('/Users/' + this.authService.uid).on('value', (snapshot)=> {
      this.plantys = snapshot.val();
      this.getPlantys();
    });
    
    this.logout = this.leng.language[this.leng.value].HomePage.logout;
  }
}
