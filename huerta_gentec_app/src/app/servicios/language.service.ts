import { Injectable } from '@angular/core';
import { Globalization } from '@ionic-native/globalization/ngx'
@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private globalization : Globalization) { }
  public value : string = 'es';

  public language = {
    'en' : {
      'LoginPage' : {
        'userlabel' : 'User',
        'passlabel' : 'Password',
        'loginlabel' : 'LOG IN',
        'fplabel' : 'Forgot your password?',
        'reglabel' : 'Sign up'
      },
      'RegisterPage' : {
        'titulo' : 'Create an user',
        'namelabel' : 'Full name',
        'maillabel' : 'Mail*',
        'passlabel' : 'Password*',
        'pass2label' : 'Repeat password*',
        'sendlabel' : 'SEND'
      },
      'FPPage' : {
        'titulo' : 'Write your e-mail',
        'userlabel' : 'User',
        'sendlabel' : 'SEND'
      },
      'ConfigPage' : {
        'header' : 'SETTINGS',
        'titulo1' : 'GENERAL SETTINGS',
        'label1' : 'Language',
        'label2' : 'Access',
        'label3' : 'Delete',
        'label4' : 'Notifications',
        'titulo2' : 'HELP',
        'label5' : 'Help',
        'label6' : 'Comments',
        'titulo3' : 'ACOUNT',
        'label7' : 'Data',
        'label8' : 'Log Out',
        'label9' : 'Dark Theme'
      },
      'HomePage' : {
        'logout' : 'EXIT'
      }
    },
    
    'es' : {
      'LoginPage' : {
        'userlabel' : 'Usuario',
        'passlabel' : 'Contraseña',
        'loginlabel' : 'INGRESAR',
        'fplabel' : '¿Olvidaste tu contraseña?',
        'reglabel' : 'Registrarse'
      },
      'RegisterPage' : {
        'titulo' : 'Crear un usuario',
        'namelabel' : 'Nombre completo',
        'maillabel' : 'Correo*',
        'passlabel' : 'Contraseña*',
        'pass2label' : 'Confirmar contraseña*',
        'sendlabel' : 'ENVIAR'
      },
      'FPPage' : {
        'titulo' : 'Introduzca su correo',
        'userlabel' : 'Usuario',
        'sendlabel' : 'ENVIAR'
      },
      'ConfigPage' : {
        'header' : 'CONFIGURACIÓN',
        'titulo1' : 'AJUSTES GENERALES',
        'label1' : 'Idioma',
        'label2' : 'Acceso',
        'label3' : 'Borrar',
        'label4' : 'Notificaciones',
        'titulo2' : 'AYUDA',
        'label5' : 'Ayuda',
        'label6' : 'Comentarios',
        'titulo3' : 'CUENTA',
        'label7' : 'Datos',
        'label8' : 'Log Out',
        'label9' : 'Tema Oscuro'
      },
      'HomePage' : {
        'logout' : 'SALIR'
      }
    }
  }
  
  setLanguage(len : string){
    if(len == "ingles"){
      this.value = "en"
    }
    else if(len == "español"){
      this.value = "es"
    }
  }
  
  getLanguage(){
    this.globalization.getPreferredLanguage().then(res =>{
      this.value = res.value[0] + res.value[1];
    }).catch(error =>{ });
  }

}
