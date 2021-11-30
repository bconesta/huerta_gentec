import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassDataService {
  nombreplanta : any;
  tipoplanta : any;
  constructor() { }
  getData(){
    const data = {
      'name' : this.nombreplanta,
      'type' : this.tipoplanta
    }
    return data;
  }
  setData(name : any, type: any){
    this.nombreplanta = name;
    this.tipoplanta = type;
  }
}
