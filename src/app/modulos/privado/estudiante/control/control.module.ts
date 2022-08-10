import { NgPipesModule } from 'ngx-pipes';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlRoutingModule } from './control-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { ErrorSeguridadComponent } from './error-seguridad/error-seguridad.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PreguntasFrecuentesComponent } from './preguntas-frecuentes/preguntas-frecuentes.component';
import {
  ProgressbarModule,
  ProgressbarConfig,
} from 'ngx-bootstrap/progressbar';

@NgModule({
  declarations: [
    InicioComponent,
    ErrorSeguridadComponent,
    PerfilComponent,
    PreguntasFrecuentesComponent,
  ],
  imports: [
    CommonModule,
    ControlRoutingModule,
    FormsModule,
    ProgressbarModule,
    NgPipesModule,
  ],
  providers: [ProgressbarConfig],
})
export class ControlModule {}
