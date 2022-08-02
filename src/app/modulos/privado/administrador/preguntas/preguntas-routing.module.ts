import { PreguntasCrearComponent } from './preguntas-crear/preguntas-crear.component';
import { PreguntasActualizarComponent } from './../preguntas/preguntas-actualizar/preguntas-actualizar.component';
import { PreguntasAdministrarComponent } from './../preguntas/preguntas-administrar/preguntas-administrar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: PreguntasAdministrarComponent },
  { path: 'crear', component: PreguntasCrearComponent },
  { path: 'actualizar/:prefId', component: PreguntasActualizarComponent },
  { path: '**', component: PreguntasAdministrarComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreguntasRoutingModule {}
