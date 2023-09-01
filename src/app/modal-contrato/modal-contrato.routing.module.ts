

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalContratoComponent } from './modal-contrato.component';

const routes: Routes = [
  {
    path: '',
    component: ModalContratoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalContratoRoutingModule {}