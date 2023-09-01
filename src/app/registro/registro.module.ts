import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegistroComponent } from './registro.component';
import { RegistroRoutingModule } from './registro.routing.module';
import { ModalModule } from '../modal/modal.module';
import { ModalContratoModule } from '../modal-contrato/modal-contrato.module';
import { NumericOnlyDirective } from '../directives/numeric-only.directive';

@NgModule({
  declarations: [RegistroComponent, NumericOnlyDirective],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ModalModule,
    ModalContratoModule,
  ],
  exports: [RegistroComponent],
})
export class RegistroModule {}
