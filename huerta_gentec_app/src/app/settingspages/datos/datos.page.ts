import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { LanguageService } from 'src/app/servicios/language.service';
@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})
export class DatosPage implements OnInit {

  constructor(private router : Router,
    private auth : AuthService,
    private leng : LanguageService
    ) { }

  back(){
    this.router.navigate(['/tabs/tabs/settings'])
  }

  ngOnInit() {
    
  }

  tittle : string;
  label1 : string;
  label2 : string;
  label3 : string;
  ionViewDidEnter(){
    this.tittle = this.leng.language[this.leng.value].DataPage.titulo;
    this.label1 = this.leng.language[this.leng.value].DataPage.label1;
    this.label2 = this.leng.language[this.leng.value].DataPage.label2;
    this.label3 = this.leng.language[this.leng.value].DataPage.label3;
    (document.getElementById('email') as any).value = this.auth.email;
    (document.getElementById('creationTime') as any).value = this.auth.creationTime;
    (document.getElementById('lastSign') as any).value = this.auth.lastSign;
  }

}
