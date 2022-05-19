import { ErrorSeguridadComponent } from './../control/error-seguridad/error-seguridad.component';
import { RolAdministrarComponent } from './rol-administrar/rol-administrar.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: RolAdministrarComponent },
  { path: '**', component: ErrorSeguridadComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolRoutingModule {}
