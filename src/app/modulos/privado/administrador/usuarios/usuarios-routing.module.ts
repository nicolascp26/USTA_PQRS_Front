import { UsuariosActualizarComponent } from './usuarios-actualizar/usuarios-actualizar.component';
import { UsuariosAdministrarComponent } from './usuarios-administrar/usuarios-administrar.component';
import { ErrorSeguridadComponent } from './../control/error-seguridad/error-seguridad.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: UsuariosAdministrarComponent },
  { path: 'actualizar/:usuarioId', component: UsuariosActualizarComponent },
  {path:'**', component:ErrorSeguridadComponent}
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule {}
