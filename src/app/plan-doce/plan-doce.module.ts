import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PlanDoceComponent } from './plan-doce.component';
import { PlanDoceRoutingModule } from './plan-doce.routing.module';

@NgModule({
  declarations: [PlanDoceComponent],
  imports: [
    CommonModule, 
    PlanDoceRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [PlanDoceComponent],
})
export class PlanDoceModule {}