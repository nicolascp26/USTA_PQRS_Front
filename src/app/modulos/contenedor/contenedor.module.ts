import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContenedorDashComponent } from './dashboard/contenedor-dash/contenedor-dash.component';
import { SidebarDashComponent } from './dashboard/sidebar-dash/sidebar-dash.component';
import { ContenedorLandComponent } from './landing/contenedor-land/contenedor-land.component';
import { PopoverModule } from 'ngx-bootstrap/popover';

@NgModule({
  declarations: [
    ContenedorDashComponent,
    SidebarDashComponent,
    ContenedorLandComponent
  ],
  imports: [
    CommonModule,
    PopoverModule,
    RouterModule
  ],
  exports:[
    ContenedorLandComponent,
  ]
})
export class ContenedorModule { }
