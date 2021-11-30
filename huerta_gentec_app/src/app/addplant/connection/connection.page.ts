import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { PassDataService } from 'src/app/servicios/pass-data.service';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AuthService } from 'src/app/servicios/auth.service';
import { WifiWizard2 } from '@ionic-native/wifi-wizard-2/ngx';
import { AlertController, LoadingController } from '@ionic/angular';

var found = false;
var mac = "-"
var uid = "-";
var objpru = [{
    'SSID' : "Fw-peql 2.4GHz",
    'level' : -80,
    'frequency' : 2200
  },
  {
    'SSID' : "lol",
    'level' : -40,
    'frequency' : 2400
  } 
]
@Component({
  selector: 'app-connection',
  templateUrl: './connection.page.html',
  styleUrls: ['./connection.page.scss'],
})
export class ConnectionPage implements OnInit {
  obje : any;
  name : string;
  type : string;
  SSID : string;
  pass : string;
  primera : boolean = false;
  Devices = objpru;
  constructor(
    private wifi : WifiWizard2,
    private authService : AuthService,
    private SerialBT : BluetoothSerial,
    private openNativeSettings: OpenNativeSettings,
    private router : Router,
    private passData : PassDataService,
    public loadingController: LoadingController,
    public alertController : AlertController) { 
    
  }
  back(){
    this.router.navigate(['/add/type']);
  }
  close(){
    this.router.navigate(['/tabs/tabs/home']);
    //this.obje = this.passData.getData();
    //console.log(this.obje['type'])
  }
  opbt(){
    //this.openNativeSettings.open("bluetooth");
    this.presentLoading();
  }
  next(){
    this.SerialBT.list().then(function(devices) {
      devices.forEach(function(device) {
        if(device.name == "MiPlanty"){
          found = true;
          mac = device.id;
        }
      })
    });
    if(found == true){
      this.SerialBT.connect(mac).subscribe(success=>{
        this.SerialBT.write("SSID");
        (document.getElementById("textoo") as any).style = "display: none;";
        (document.getElementById("boton_sig") as any).style = "display: none;";
        (document.getElementById("wifi-scan") as any).style = "display: block;";
        this.scannerWifi();
        alert("CONECTADO")
      }, error=>{});
      
    }
    else{alert("No encontrado"); this.scannerWifi();}
    this.scannerWifi();
  }

  scannerWifi(){
    this.wifi.requestPermission().then(res =>{
      this.wifi.scan().then(resp =>{
        this.Devices = resp.filter(red =>{
          return red.frequency <= 3000 && red.level > -70 && red.SSID;
        });
        this.Devices.forEach(red =>{
          red.level = red.level*(1/70)+10/7;
        }); 
      });
    });
    
  }

  setSSID(ssid : any){
    this.SSID = ssid;
    console.log(this.SSID);
    (document.getElementById("set-pass") as any).style = "display: block;";
  }

  setManually(){
    (document.getElementById("set-manually") as any).style = "display: block;";
    (document.getElementById("wifi-scan") as any).style = "display: none;";
    (document.getElementById("set-pass") as any).style = "display: none;";
  }

  sendData(){
    this.authService.getUser().then(user =>{
      this.SerialBT.write(this.SSID + "$" + this.pass + "$" + user['_delegate']['uid'] + "/" + this.passData.getData()['name']);
      console.log(this.SSID + "$" + this.pass + "$" + user['_delegate']['uid'] + "/" + this.passData.getData()['name']);
      setInterval(()=>{
        this.SerialBT.subscribe('$').subscribe(data =>{
          if(data == "TRY$"){
            this.presentLoading();
          }
          else if(data == "FAIL$"){
            this.loadingController.dismiss();
            this.presentAlert('Error', 'Los datos ingresados son incorrectos');
          }
          else if(data == "CONNECTED$"){
            this.loadingController.dismiss();
            this.presentAlert('¡Conectado!', 'Su planty fue agregada con éxito'); 
            this.router.navigate(['/tabs/tabs/home']);
          }
        })
      }, 1000);
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Conectando',
      duration: 30000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async presentAlert(header : string, meg : string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: meg,
      buttons: ['Volver']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    //this.router.navigate(['/tabs/tabs/home']);
  }

  ionAlertDidDismiss(){
    
  }

  ngOnInit() {
  }

}
