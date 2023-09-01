import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalPagoModule } from '../modal-pago/modal-pago.module';
import { ModalContratoComponent } from './modal-contrato.component';
import { ModalContratoRoutingModule } from './modal-contrato.routing.module';

@NgModule({
  declarations: [ModalContratoComponent],
  imports: [
    CommonModule,
    ModalContratoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ModalPagoModule,
  ],
  exports: [ModalContratoComponent],
})
export class ModalContratoModule {}
