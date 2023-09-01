

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalPagoComponent } from './modal-pago.component';

const routes: Routes = [
  {
    path: '',
    component: ModalPagoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalPagoRoutingModule {}