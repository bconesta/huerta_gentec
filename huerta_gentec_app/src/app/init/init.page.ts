import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';
import { LanguageService } from '../servicios/language.service';

@Component({
  selector: 'app-init',
  templateUrl: './init.page.html',
  styleUrls: ['./init.page.scss'],
})
export class InitPage implements OnInit {

  constructor(private AFauth : AngularFireAuth, private authService : AuthService, public router : Router, private leng : LanguageService) { }

  ngOnInit() {
    this.AFauth.authState.subscribe(user=>{
      if(user){this.router.navigate(['tabs/tabs/home']);}
      else{this.router.navigate(['/login']);}
    })
    if(!this.leng.value){
      this.leng.getLanguage();
    }
  }

}
