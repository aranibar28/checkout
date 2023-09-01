import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubscripcionComponent } from './subscripcion.component';
import { SubscripcionRoutingModule } from './subscripcion.routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PlanDoceModule } from '../plan-doce/plan-doce.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [SubscripcionComponent],
  imports: [
    CommonModule, 
    SubscripcionRoutingModule,
    FontAwesomeModule,
    PlanDoceModule
  ],
  exports: [SubscripcionComponent],
})
export class SubscripcionModule {}