import { RUTAS_LANDING } from './utilidades/rutas/landing-rutas';
import { RUTAS_DASHBOARD_ADMINISTRADOR } from './utilidades/rutas/administrador-dashboard-rutas';
import { RUTAS_DASHBOARD_ESTUDIANTE } from './utilidades/rutas/estudiante-dashboard-rutas';

import { VigilanteGuard } from './vigilante.guard';
import { ErrorComponent } from './modulos/publico/error/error.component';
import { ContenedorDashComponent } from './modulos/contenedor/dashboard/contenedor-dash/contenedor-dash.component';
import { ContenedorLandComponent } from './modulos/contenedor/landing/contenedor-land/contenedor-land.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ContenedorLandComponent, children: RUTAS_LANDING },
  {
    path: 'estudiante',
    component: ContenedorDashComponent,
    children: RUTAS_DASHBOARD_ESTUDIANTE,
    canActivate: [VigilanteGuard],
  },
  {
    path: 'administrador',
    component: ContenedorDashComponent,
    children: RUTAS_DASHBOARD_ADMINISTRADOR,
    canActivate: [VigilanteGuard],
    canActivateChild: [],
  },
  {
    path: 'invitado',
    component: ContenedorDashComponent,
    children: RUTAS_DASHBOARD_ADMINISTRADOR,
    canActivate: [VigilanteGuard],
  },
  { path: '**', component: ErrorComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
