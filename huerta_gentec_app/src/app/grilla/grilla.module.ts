import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrillaPageRoutingModule } from './grilla-routing.module';

import { GrillaPage } from './grilla.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrillaPageRoutingModule
  ],
  declarations: [GrillaPage]
})
export class GrillaPageModule {}
