import { AfterViewInit, Component, OnInit } from '@angular/core'
import { CalendarComponent } from 'ionic2-calendar'
import {ModalController} from '@ionic/angular'
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { AuthService } from 'src/app/servicios/auth.service';



@Component({
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.page.html',
  styleUrls: ['./cal-modal.page.scss'],
})
export class CalModalPage implements AfterViewInit {

  calendar = {
    mode:'month',
    currentDate: new Date()
  };
  vistaTitle: string;

  event = {
    title: '',
    desc: '',
    startTime: null,
    endTime: '',
    allDay: true
  };
  usuario: any;

  modalReady = false; //para que se vea bien el modal
  
  constructor(
    private modalCtrl:ModalController,
    public db:AngularFireDatabase,
    public auth:AuthService) {

     }

/*  ngOnInit() {
  }
*/
  ngAfterViewInit(){
    setTimeout(() => {
      this.modalReady = true;
    },0);
  }

  guardar(){
    this.modalCtrl.dismiss ({event: this.event})
    this.usuario = this.auth.getUID();
    this.db.database.ref('Users/' + this.usuario +'/Calendario/'+ this.event.startTime).set(this.event.title);
  }

  tituloMeses(title){
    this.vistaTitle = title;
  }

  tiempoElegido(ev){
    console.log ('ev:', ev);
    this.event.startTime = new Date(ev.selectedTime);
  }

  volverModal(){
    this.modalCtrl.dismiss();
  }

}
