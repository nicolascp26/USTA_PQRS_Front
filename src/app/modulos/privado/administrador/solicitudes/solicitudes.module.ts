import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlRoutingModule } from './control-routing.module';
import { MensajeAdministrarComponent } from './mensaje-administrar/mensaje-administrar.component';
import { MensajeVisualizarComponent } from './mensaje-visualizar/mensaje-visualizar.component';


@NgModule({
  declarations: [
    MensajeAdministrarComponent,
    MensajeVisualizarComponent
  ],
  imports: [
    CommonModule,
    ControlRoutingModule
  ]
})
export class SolicitudesModule { }
