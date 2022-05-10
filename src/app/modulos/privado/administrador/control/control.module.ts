import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlRoutingModule } from './control-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { ErrorSeguridadComponent } from './error-seguridad/error-seguridad.component';



@NgModule({
  declarations: [
    InicioComponent,
    ErrorSeguridadComponent
  ],
  imports: [
    CommonModule,
    ControlRoutingModule
  ]
})
export class ControlModule { }
