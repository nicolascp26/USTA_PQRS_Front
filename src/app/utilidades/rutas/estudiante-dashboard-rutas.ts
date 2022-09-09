import { ErrorSeguridadComponent } from './../../modulos/privado/estudiante/control/error-seguridad/error-seguridad.component';
import { Routes } from '@angular/router';

export const RUTAS_DASHBOARD_ESTUDIANTE: Routes = [
  {
    path: 'inicio',
    loadChildren: () =>
      import('../../modulos/privado/estudiante/control/control.module').then(
        (m) => m.ControlModule
      ),
  },
  {
    path: 'solicitudes',
    loadChildren: () =>
      import(
        '../../modulos/privado/estudiante/solicitudes/solicitudes.module'
      ).then((m) => m.SolicitudesModule),
  },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: '**', component: ErrorSeguridadComponent, pathMatch: 'full' },
];
