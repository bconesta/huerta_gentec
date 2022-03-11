import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  constructor(private router : Router) { }

  back(){
    this.router.navigate(['/tabs/tabs/settings'])
  }

  linkedin(nombre : string){
    window.open(
      nombre==='bruno' ? 'https://www.linkedin.com/in/bruno-conesta/' : 
      (nombre==='anto' ? 'https://www.linkedin.com/in/antonella-de-cia-4797111b6/' : 
      (nombre==='wally' ? 'https://www.linkedin.com/in/walter-herrera-421864170/' : 
      'https://www.linkedin.com/in/nicol%C3%A1s-l%C3%B3pez-ab26171a7/')), '_blank');
  }
  ngOnInit() {
  }

}
