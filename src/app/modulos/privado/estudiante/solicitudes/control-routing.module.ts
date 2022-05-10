import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensajeAdministrarComponent } from './mensaje-administrar/mensaje-administrar.component';
import { MensajeCrearComponent } from './mensaje-crear/mensaje-crear.component';

const routes: Routes = [
  { path: 'administrarSolicitudes', component: MensajeAdministrarComponent },
  { path: 'crear', component: MensajeCrearComponent },
  { path: '', redirectTo: 'administrarSolicitudes', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlRoutingModule {}
