import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolRoutingModule } from './rol-routing.module';
import { RolAdministrarComponent } from './rol-administrar/rol-administrar.component';
import { RolCrearComponent } from './rol-crear/rol-crear.component';


@NgModule({
  declarations: [
    RolAdministrarComponent,
    RolCrearComponent
  ],
  imports: [
    CommonModule,
    RolRoutingModule
  ]
})
export class RolModule { }
