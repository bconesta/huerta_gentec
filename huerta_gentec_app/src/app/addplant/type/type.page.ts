import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OptionsPage } from '../options/options.page';
import { PassDataService } from 'src/app/servicios/pass-data.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-type',
  templateUrl: './type.page.html',
  styleUrls: ['./type.page.scss'],
})
export class TypePage implements OnInit {
  tipoplanta : string = "";
  name : string = "";

  constructor(
    private router : Router,
    public modalController: ModalController,
    private passData : PassDataService,
    private toastController : ToastController
    ) { }
  back(){
    this.router.navigate(['tabs/tabs/home']);
  }
  
  async toasterror(){
    const toast = await this.toastController.create({
      message: 'Complete todos los datos para continuar :)',
      duration: 2000
    });
    toast.present();
  }

  next(){
    if(this.tipoplanta != "" && this.name != ""){
      this.passData.setData(this.name, this.tipoplanta['type']);
      this.router.navigate(['/add/connection']);
    }
    else{
      this.toasterror();
    }
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: OptionsPage,
      cssClass: 'my-custom-class'
    });
    
    modal.onDidDismiss().then((data) => {
      this.tipoplanta = data['data'];
      console.log(this.tipoplanta['type']);
      (document.getElementById('planttype') as any).value = this.tipoplanta['type'];
    });
    
    return await modal.present();
  }

  
  ngOnInit() {
  }

}
