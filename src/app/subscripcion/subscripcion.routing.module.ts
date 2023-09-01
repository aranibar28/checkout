import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscripcionComponent } from './subscripcion.component';

const routes: Routes = [
  {
    path: '',
    component: SubscripcionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscripcionRoutingModule {}