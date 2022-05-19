import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosAdministrarComponent } from './usuarios-administrar/usuarios-administrar.component';
import { UsuariosCrearComponent } from './usuarios-crear/usuarios-crear.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';



@NgModule({
  declarations: [
    UsuariosAdministrarComponent,
    UsuariosCrearComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
