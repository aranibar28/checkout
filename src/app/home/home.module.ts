import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PlanDoceModule } from '../plan-doce/plan-doce.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule, 
    HomeRoutingModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}