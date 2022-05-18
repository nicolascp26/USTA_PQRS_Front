import { RolModule } from './../../modulos/privado/administrador/rol/rol.module';
import { Routes } from '@angular/router';

export const RUTAS_DASHBOARD_ADMINISTRADOR: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../../modulos/privado/administrador/control/control.module').then(
        (m) => m.ControlModule
      ),
  },
  {
    path: 'solicitudes',
    loadChildren: () =>
      import('../../modulos/privado/administrador/solicitudes/solicitudes.module').then(
        (m) => m.SolicitudesModule
      ),
  },
  {
    path: 'roles',
    loadChildren: () =>
      import('../../modulos/privado/administrador/rol/rol.module').then(
        (m) => m.RolModule
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
