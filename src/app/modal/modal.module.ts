import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from './modal.component';
import { ModalRoutingModule } from './modal.routing.module';
import { ModalPagoModule } from '../modal-pago/modal-pago.module';

@NgModule({
  declarations: [ModalComponent],
  imports: [
    CommonModule,
    ModalRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ModalPagoModule,
  ],
  exports: [ModalComponent],
})
export class ModalModule {}
