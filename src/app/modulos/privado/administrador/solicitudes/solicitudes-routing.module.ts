import { MensajeTiposComponent } from './mensaje-tipos/mensaje-tipos.component';
import { ErrorSeguridadComponent } from '../control/error-seguridad/error-seguridad.component';
import { Routes, RouterModule } from '@angular/router';
import { MensajeVisualizarComponent } from './mensaje-visualizar/mensaje-visualizar.component';
import { MensajeAdministrarComponent } from './mensaje-administrar/mensaje-administrar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: MensajeAdministrarComponent },
  { path: 'visualizar/:mensajeId', component: MensajeVisualizarComponent },
  { path: 'tipos', component: MensajeTiposComponent },
  { path: '**', component: ErrorSeguridadComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesRoutingModule {}
