import { ErrorSeguridadComponent } from './../../administrador/control/error-seguridad/error-seguridad.component';
import { InicioComponent } from './../../administrador/control/inicio/inicio.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: '**', component: ErrorSeguridadComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlRoutingModule { }
