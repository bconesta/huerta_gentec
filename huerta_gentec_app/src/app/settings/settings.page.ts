import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../servicios/auth.service'
import { LanguageService } from '../servicios/language.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private authService : AuthService, public router : Router, private leng : LanguageService) { }
  lenguaje : string = "en"
  
  languageChange(){
    this.leng.setLanguage((document.getElementById("selecidioma") as any).value);
    this.ngOnInit();
  }

  backHome(){
    this.router.navigate(['/tabs/tabs/home']);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['']);
  }

  popupAyuda(){
    alert();
  }

  //test git
  
  
  
  
  header : string;
  titulo1 : string;
  label1 : string;
  label2 : string;
  label3 : string;
  label4 : string;
  titulo2 : string;
  label5 : string;
  label6 : string;
  titulo3 : string;
  label7 : string;
  label8 : string;
  label9 : string;
  
  
  ngOnInit() {
    this.header = this.leng.language[this.leng.value].ConfigPage.header;
    this.titulo1 = this.leng.language[this.leng.value].ConfigPage.titulo1;
    this.label1 = this.leng.language[this.leng.value].ConfigPage.label1;
    this.label2 = this.leng.language[this.leng.value].ConfigPage.label2;
    this.label3 = this.leng.language[this.leng.value].ConfigPage.label3;
    this.label4 = this.leng.language[this.leng.value].ConfigPage.label4;
    this.titulo2 = this.leng.language[this.leng.value].ConfigPage.titulo2;
    this.label5 = this.leng.language[this.leng.value].ConfigPage.label5;
    this.label6 = this.leng.language[this.leng.value].ConfigPage.label6;
    this.titulo3 = this.leng.language[this.leng.value].ConfigPage.titulo3;
    this.label7 = this.leng.language[this.leng.value].ConfigPage.label7;
    this.label8 = this.leng.language[this.leng.value].ConfigPage.label8;
    this.label9 = this.leng.language[this.leng.value].ConfigPage.label9;
    if(this.leng.value == "es"){
      (document.getElementById("selecidioma") as any).value="español"
    }
    else if(this.leng.value == "en"){
      (document.getElementById("selecidioma") as any).value="ingles"
    }
  }

}
