import { ErrorSeguridadComponent } from '../control/error-seguridad/error-seguridad.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensajeAdministrarComponent } from './mensaje-administrar/mensaje-administrar.component';
import { MensajeCrearComponent } from './mensaje-crear/mensaje-crear.component';

const routes: Routes = [
  { path: '', component: MensajeAdministrarComponent },
  { path: 'crear', component: MensajeCrearComponent },
  { path: '**', component: ErrorSeguridadComponent},
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudesRoutingModule {}
