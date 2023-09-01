

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalInfocuentasComponent } from './modal-infocuentas.component';

const routes: Routes = [
  {
    path: '',
    component: ModalInfocuentasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalInfoCuentasRoutingModule {}