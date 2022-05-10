import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlRoutingModule } from './control-routing.module';
import { MensajeAdministrarComponent } from './mensaje-administrar/mensaje-administrar.component';
import { MensajeCrearComponent } from './mensaje-crear/mensaje-crear.component';


@NgModule({
  declarations: [
    MensajeAdministrarComponent,
    MensajeCrearComponent
  ],
  imports: [
    CommonModule,
    ControlRoutingModule
  ]
})
export class SolicitudesModule { }
