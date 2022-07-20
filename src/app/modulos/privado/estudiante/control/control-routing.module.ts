import { ErrorSeguridadComponent } from './error-seguridad/error-seguridad.component';
import { PreguntasFrecuentesComponent } from './preguntas-frecuentes/preguntas-frecuentes.component';
import { PerfilComponent } from './perfil/perfil.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';

const routes:Routes =[
  {path:'',component:InicioComponent},
  {path:'perfil',component:PerfilComponent},
  {path:'preguntas-frecuentes',component:PreguntasFrecuentesComponent},
  { path: '**', component: ErrorSeguridadComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class ControlRoutingModule { }
