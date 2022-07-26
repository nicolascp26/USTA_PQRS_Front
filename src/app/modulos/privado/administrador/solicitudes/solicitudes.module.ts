import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudesRoutingModule } from './solicitudes-routing.module';
import { MensajeAdministrarComponent } from './mensaje-administrar/mensaje-administrar.component';
import { MensajeVisualizarComponent } from './mensaje-visualizar/mensaje-visualizar.component';
import { MensajeTiposComponent } from './mensaje-tipos/mensaje-tipos.component';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  declarations: [
    MensajeAdministrarComponent,
    MensajeVisualizarComponent,
    MensajeTiposComponent,
  ],
  imports: [CommonModule, FormsModule, SolicitudesRoutingModule, NgPipesModule],
})
export class SolicitudesModule {}
