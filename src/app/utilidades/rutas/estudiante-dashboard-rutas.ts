import { ControlModule } from './../../modulos/privado/estudiante/control/control.module';
import { SolicitudesModule } from '../../modulos/privado/estudiante/solicitudes/solicitudes.module';
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
      import('../../modulos/privado/estudiante/solicitudes/solicitudes.module').then(
        (m) => m.SolicitudesModule
      ),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
  //{ path: '**', component: ErrorSeguridadComponent }
];
