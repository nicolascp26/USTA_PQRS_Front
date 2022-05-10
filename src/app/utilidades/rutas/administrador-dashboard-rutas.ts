import { Routes } from '@angular/router';

export const RUTAS_DASHBOARD_ADMINISTRADOR: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../../modulos/privado/administrador/control/control.module').then(
        (m) => m.ControlModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../../modulos/privado/administrador/solicitudes/solicitudes.module').then(
        (m) => m.SolicitudesModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('../../modulos/publico/publico.module').then(
        (m) => m.PublicoModule
      ),
  },
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
];
