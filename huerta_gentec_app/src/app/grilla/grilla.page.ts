import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service'
import { Router } from '@angular/router'
import {onValue} from 'firebase/database'
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/compat/database';

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
    private elementRef: ElementRef) { 
      
  }

  ngOnInit() {
  }

  
}
