import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudesRoutingModule } from './solicitudes-routing.module';
import { MensajeAdministrarComponent } from './mensaje-administrar/mensaje-administrar.component';
import { MensajeCrearComponent } from './mensaje-crear/mensaje-crear.component';
import { MensajeVisualizarComponent } from './mensaje-visualizar/mensaje-visualizar.component';
import { NgPipesModule } from 'ngx-pipes';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    MensajeAdministrarComponent,
    MensajeCrearComponent,
    MensajeVisualizarComponent,
  ],
  imports: [
    CommonModule,
    SolicitudesRoutingModule,
    FormsModule,
    NgxPaginationModule,
    NgPipesModule,
  ],
})
export class SolicitudesModule {}
