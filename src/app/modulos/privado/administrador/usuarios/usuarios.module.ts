import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosAdministrarComponent } from './usuarios-administrar/usuarios-administrar.component';
import { UsuariosActualizarComponent } from './usuarios-actualizar/usuarios-actualizar.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UsuariosAdministrarComponent,
    UsuariosActualizarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
