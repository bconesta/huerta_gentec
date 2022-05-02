import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LanguageService } from 'src/app/servicios/language.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {

  constructor(public modalController : ModalController, public leng : LanguageService) { }
  selectCactus(){
    this.modalController.dismiss({
      'dismissed': true,
      'type' : "Cactus"
    });
  }
  selectCustom(){
    this.modalController.dismiss({
      'dismissed': true,
      'type' : "Custom"
    });
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true,
    });
  }

  tittle : string;

  ionViewDidEnter(){
    this.tittle = this.leng.language[this.leng.value].OptionsPage.titulo;
  }

  ngOnInit() {
  }

}
