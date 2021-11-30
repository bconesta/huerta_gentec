import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { ToastController } from '@ionic/angular';
import { LanguageService } from '../servicios/language.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name : string;
  mail : string;
  pass : string;
  pass_con : string;
  constructor(private router : Router, private authService : AuthService, public toastController : ToastController, private leng : LanguageService) { }

  back(){
    this.router.navigate(['']);
  }

  r_send(){
    if(this.pass == this.pass_con){
      this.authService.signup(this.mail, this.pass).then(resolve => {
        alert("Usuario creado con éxito");
        this.router.navigate(['']);
      }, rejected => {
        this.toasterror("Los datos son incorrectos o ya fueron utilizados");
      });
    }
    else{
      this.toasterror("Las contraseñas no coinciden");
    }
  }

  async toasterror(error : string){
    const toast = await this.toastController.create({
      message: error,
      duration: 2000
    });
    toast.present();
  }


  titulo : string;
  namelabel : string;
  maillabel : string;
  passlabel : string;
  pass2label : string;
  sendlabel : string;

  ngOnInit() {
    this.titulo = this.leng.language[this.leng.value].RegisterPage.titulo;
    this.namelabel = this.leng.language[this.leng.value].RegisterPage.namelabel;
    this.maillabel = this.leng.language[this.leng.value].RegisterPage.maillabel;
    this.passlabel = this.leng.language[this.leng.value].RegisterPage.passlabel;
    this.pass2label = this.leng.language[this.leng.value].RegisterPage.pass2label;
    this.sendlabel = this.leng.language[this.leng.value].RegisterPage.sendlabel;
  }

}
