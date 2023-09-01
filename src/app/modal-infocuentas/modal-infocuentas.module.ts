import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalPagoModule } from '../modal-pago/modal-pago.module';
import { ModalInfocuentasComponent } from './modal-infocuentas.component';
import { ModalInfoCuentasRoutingModule } from './modal-infocuentas.routing.module';

@NgModule({
  declarations: [ModalInfocuentasComponent],
  imports: [
    CommonModule,
    ModalInfoCuentasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [ModalInfocuentasComponent],
})
export class ModalInfoCuentasModule {}
