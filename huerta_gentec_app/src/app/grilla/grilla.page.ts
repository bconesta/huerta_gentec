import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service'
import { Router } from '@angular/router'
import {onValue} from 'firebase/database'
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/compat/database';
import { LanguageService } from '../servicios/language.service';

@Component({
  selector: 'app-grilla',
  templateUrl: './grilla.page.html',
  styleUrls: ['./grilla.page.scss'],
})
export class GrillaPage implements OnInit {

  constructor(
    private authService : AuthService,
    public router : Router,
    public onValue : AngularFireDatabase,
    public db:AngularFireDatabase,
    private elementRef: ElementRef,
    private leng : LanguageService) { 
      
  }

  change(){
    this.db.database.ref('/Users/' + this.authService.uid + '/ranges/hum').set((document.getElementById('hum') as any).value);
    this.db.database.ref('/Users/' + this.authService.uid + '/ranges/temp').set((document.getElementById('temp') as any).value);
    this.db.database.ref('/Users/' + this.authService.uid + '/ranges/cant').set((document.getElementById('cant') as any).value);
  }


  tittle : string;
  humLabel : string;
  tempLabel : string;
  cantLabel : string;
  ngOnInit() {
    
  }
  ionViewDidEnter(){
    this.db.database.ref('/Users/' + this.authService.uid).on('value', (snapshot)=> {
      (document.getElementById('hum') as any).value = snapshot.val().ranges.hum;
      (document.getElementById('temp') as any).value = snapshot.val().ranges.temp;
      (document.getElementById('cant') as any).value = snapshot.val().ranges.cant;
    });

    this.tittle = this.leng.language[this.leng.value].RangePage.titulo;
    this.humLabel = this.leng.language[this.leng.value].RangePage.label1;
    this.tempLabel = this.leng.language[this.leng.value].RangePage.label2;
    this.cantLabel = this.leng.language[this.leng.value].RangePage.label3;
  }
}
