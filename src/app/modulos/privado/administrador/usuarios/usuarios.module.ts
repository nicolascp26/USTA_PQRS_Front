import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosAdministrarComponent } from './usuarios-administrar/usuarios-administrar.component';
import { UsuariosActualizarComponent } from './usuarios-actualizar/usuarios-actualizar.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';



@NgModule({
  declarations: [
    UsuariosAdministrarComponent,
    UsuariosActualizarComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
