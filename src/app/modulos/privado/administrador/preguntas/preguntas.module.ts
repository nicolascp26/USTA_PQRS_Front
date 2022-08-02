import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreguntasRoutingModule } from './preguntas-routing.module';
import { PreguntasAdministrarComponent } from './preguntas-administrar/preguntas-administrar.component';
import { PreguntasActualizarComponent } from './preguntas-actualizar/preguntas-actualizar.component';
import { NgPipesModule } from 'ngx-pipes';
import { PreguntasCrearComponent } from './preguntas-crear/preguntas-crear.component';

@NgModule({
  declarations: [PreguntasAdministrarComponent, PreguntasActualizarComponent, PreguntasCrearComponent],
  imports: [CommonModule, FormsModule, PreguntasRoutingModule, NgPipesModule],
})
export class PreguntasModule {}
