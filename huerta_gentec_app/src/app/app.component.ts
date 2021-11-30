import { Component } from '@angular/core';
import { LanguageService } from './servicios/language.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private leng : LanguageService) {
    this.leng.getLanguage();
  }
}
