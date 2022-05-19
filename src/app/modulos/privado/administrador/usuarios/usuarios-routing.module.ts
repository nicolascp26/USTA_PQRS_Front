import { UsuariosCrearComponent } from './usuarios-crear/usuarios-crear.component';
import { UsuariosAdministrarComponent } from './usuarios-administrar/usuarios-administrar.component';
import { ErrorSeguridadComponent } from './../control/error-seguridad/error-seguridad.component';
import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: UsuariosAdministrarComponent },
  { path: 'crear', component: UsuariosCrearComponent },

  { path: '**', component: ErrorSeguridadComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UsuariosRoutingModule { }
