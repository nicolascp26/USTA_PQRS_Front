import { NgPipesModule } from 'ngx-pipes';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlRoutingModule } from './control-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { ErrorSeguridadComponent } from './error-seguridad/error-seguridad.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PreguntasFrecuentesComponent } from './preguntas-frecuentes/preguntas-frecuentes.component';

@NgModule({
  declarations: [InicioComponent, ErrorSeguridadComponent, PerfilComponent, PreguntasFrecuentesComponent],
  imports: [CommonModule, ControlRoutingModule,FormsModule, NgPipesModule]
})
export class ControlModule {}
