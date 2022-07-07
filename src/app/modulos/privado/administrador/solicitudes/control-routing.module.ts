import { ErrorSeguridadComponent } from './../../administrador/control/error-seguridad/error-seguridad.component';
import { Routes } from '@angular/router';
import { MensajeVisualizarComponent } from './../../estudiante/solicitudes/mensaje-visualizar/mensaje-visualizar.component';
import { MensajeAdministrarComponent } from './mensaje-administrar/mensaje-administrar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: MensajeAdministrarComponent },
  { path: 'visualizar/:mensajeId', component: MensajeVisualizarComponent },
  { path: '**', component: ErrorSeguridadComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ControlRoutingModule { }
