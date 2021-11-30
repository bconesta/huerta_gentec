import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service'
import { Router } from '@angular/router'
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LanguageService } from '../servicios/language.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  user : string;
  password : string;

  constructor(private AFauth : AngularFireAuth, private authService : AuthService, public router : Router, private leng : LanguageService) { 
    
  }
  
  userlabel : string;
  passlabel : string;
  loginlabel : string;
  fplabel : string;
  reglabel : string;

  ngOnInit() {
    this.AFauth.authState.subscribe(user=>{
      if(user){this.router.navigate(['tabs/tabs/home']);}
      
    })
    if(!this.leng.value){
      this.leng.getLanguage();
    }
    this.userlabel = this.leng.language[this.leng.value].LoginPage.userlabel;
    this.passlabel = this.leng.language[this.leng.value].LoginPage.passlabel;
    this.loginlabel = this.leng.language[this.leng.value].LoginPage.loginlabel;
    this.fplabel = this.leng.language[this.leng.value].LoginPage.fplabel;
    this.reglabel = this.leng.language[this.leng.value].LoginPage.reglabel;
    
  }
  ionViewDidEnter(){
    this.userlabel = this.leng.language[this.leng.value].LoginPage.userlabel;
    this.passlabel = this.leng.language[this.leng.value].LoginPage.passlabel;
    this.loginlabel = this.leng.language[this.leng.value].LoginPage.loginlabel;
    this.fplabel = this.leng.language[this.leng.value].LoginPage.fplabel;
    this.reglabel = this.leng.language[this.leng.value].LoginPage.reglabel;
  }


  showPass(){
    console.log(this.user);
    console.log(this.password);
    let pass :any = document.getElementById('passId');
    let icon :any = document.getElementById('seeIcon');
    if(pass.type == "password"){
      pass.type = "text";
      icon.name = "eye-off-outline";
    }
    else{
      pass.type = "password";
      icon.name = "eye-outline";
    }
  }

  log_in(){
    this.authService.login(this.user, this.password).then(res =>{
      this.router.navigate(['/tabs/tabs/home']);
      this.authService.uid = res['user']['_delegate']['uid'];
    }).catch(err => alert('Los datos son incorrectos'))
    
    }
  forpass(){
    this.router.navigate(['/forgotten-password']);
  }
  register(){
    this.router.navigate(['/register']);
  }

  

}
