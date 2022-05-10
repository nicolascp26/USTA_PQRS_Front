import { ErrorSeguridadComponent } from './../control/error-seguridad/error-seguridad.component';
import { RolCrearComponent } from './rol-crear/rol-crear.component';
import { RolAdministrarComponent } from './rol-administrar/rol-administrar.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: 'manage', component: RolAdministrarComponent },
  { path: 'create', component: RolCrearComponent },

  { path: '', redirectTo: 'acceso', pathMatch: 'full' },
  { path: '**', component: ErrorSeguridadComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolRoutingModule {}
