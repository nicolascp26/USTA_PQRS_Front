import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolRoutingModule } from './rol-routing.module';
import { RolAdministrarComponent } from './rol-administrar/rol-administrar.component';

@NgModule({
  declarations: [
    RolAdministrarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RolRoutingModule
  ]
})
export class RolModule { }
