import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { SubscripcionComponent } from './subscripcion/subscripcion.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)
  },
  { 
    path: 'subscripcion/:id', 
    loadChildren: () => import('./subscripcion/subscripcion.module').then((m) => m.SubscripcionModule)
  },
  {
    path: 'registro',
    component: RegistroComponent,
    loadChildren: () => import('./registro/registro.module').then((m) => m.RegistroModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
