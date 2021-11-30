import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrillaPage } from './grilla.page';

const routes: Routes = [
  {
    path: '',
    component: GrillaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrillaPageRoutingModule {}
