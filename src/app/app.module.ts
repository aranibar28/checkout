import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PlanDoceComponent } from './plan-doce/plan-doce.component';
import { RegistroComponent } from './registro/registro.component';
import { ApiService } from './services/api.service';
import { PlanService } from './services/plan.service';
import { SubscripcionService } from './services/subscripcion.service';
import { SubscripcionComponent } from './subscripcion/subscripcion.component';
import { HttpClientModule } from '@angular/common/http';
import {
  CheckoutService,
  ConsultService,
  MercadoPagoService,
  NotifyService,
  RjxService,
  SessionService,
  UbigeoService,
} from './services';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ModalComponent } from './modal/modal.component';
import { PaymentComponent } from './payment/payment.component';
import { ModalContratoComponent } from './modal-contrato/modal-contrato.component';
import { ModalInfocuentasComponent } from './modal-infocuentas/modal-infocuentas.component';
import { ModalPagoComponent } from './modal-pago/modal-pago.component';
import { NgxMercadopagoModule } from 'ngx-mercadopago';
import { MailValidation } from './customs';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    NgxMercadopagoModule.forRoot({
      publishKey: 'TEST-bb57dd72-6502-4fc5-8d7d-3130ecee5487',
      pathSDK: 'https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js',
    }),
    FontAwesomeModule,
  ],
  providers: [
    ApiService,
    PlanService,
    SubscripcionService,
    RjxService,
    SessionService,
    NotifyService,
    ConsultService,
    UbigeoService,
    CheckoutService,
    MercadoPagoService,
    MailValidation,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
