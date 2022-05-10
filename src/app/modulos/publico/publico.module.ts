import { ContenedorModule } from './../contenedor/contenedor.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicoRoutingModule } from './publico-routing.module';
import { AccesoComponent } from './acceso/acceso.component';
import { RegistroComponent } from './registro/registro.component';
import { ErrorComponent } from './error/error.component';
import { FormsModule } from '@angular/forms';
import { Toast, ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AccesoComponent,
    RegistroComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ContenedorModule,
    PublicoRoutingModule,
    ToastrModule.forRoot()
  ]
})
export class PublicoModule { }
