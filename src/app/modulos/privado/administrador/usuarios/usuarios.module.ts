import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosAdministrarComponent } from './usuarios-administrar/usuarios-administrar.component';
import { UsuariosActualizarComponent } from './usuarios-actualizar/usuarios-actualizar.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { FormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [UsuariosAdministrarComponent, UsuariosActualizarComponent],
  imports: [
    CommonModule,
    FormsModule,
    UsuariosRoutingModule,
    NgxPaginationModule,
    NgPipesModule,
  ],
})
export class UsuariosModule {}
