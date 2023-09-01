

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanDoceComponent } from './plan-doce.component';

const routes: Routes = [
  {
    path: '',
    component: PlanDoceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanDoceRoutingModule {}