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
        'label5' : 'Creators',
        'label6' : 'Comments',
        'titulo3' : 'ACOUNT',
        'label7' : 'Data',
        'label8' : 'Log Out',
        'label9' : 'Dark Theme'
      },
      'HomePage' : {
        'logout' : 'EXIT',
        'stateOn' : 'ON',
        'stateOff' : 'OFF'
      },
      'RangePage' : {
        'titulo' : 'Define ranges',
        'label1' : 'Humidity',
        'label2' : 'Temperature',
        'label3' : 'Minimum sensors'
      },
      'DataPage' : {
        'titulo' : 'Account data',
        'label1' : 'E-mail',
        'label2' : 'Creation date',
        'label3' : 'Last log in date'
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
        'label5' : 'Creadores',
        'label6' : 'Comentarios',
        'titulo3' : 'CUENTA',
        'label7' : 'Datos',
        'label8' : 'Cerrar sesión',
        'label9' : 'Tema Oscuro'
      },
      'HomePage' : {
        'logout' : 'SALIR',
        'stateOn' : 'Encendido',
        'stateOff' : 'Apagado'
      },
      'RangePage' : {
        'titulo' : 'Definir rangos',
        'label1' : 'Humedad',
        'label2' : 'Temperatura',
        'label3' : 'Cantidad minima'
      },
      'DataPage' : {
        'titulo' : 'Datos de la cuenta',
        'label1' : 'Correo electrónico',
        'label2' : 'Fecha de creación',
        'label3' : 'Último inicio de sesión'
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
