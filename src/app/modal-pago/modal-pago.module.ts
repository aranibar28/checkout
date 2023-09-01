import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalPagoComponent } from './modal-pago.component';
import { ModalPagoRoutingModule } from './modal-pago.routing.module';
import { ModalInfoCuentasModule } from '../modal-infocuentas/modal-infocuentas.module';

@NgModule({
  declarations: [ModalPagoComponent],
  imports: [
    CommonModule,
    ModalPagoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ModalInfoCuentasModule
  ],
  exports: [ModalPagoComponent],
})
export class ModalPagoModule {}
