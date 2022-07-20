import { Routes } from '@angular/router';

export const RUTAS_DASHBOARD_ADMINISTRADOR: Routes = [
  {
    path: 'inicio',
    loadChildren: () =>
      import('../../modulos/privado/administrador/control/control.module').then(
        (m) => m.ControlModule
      ),
  },
  {
    path: 'solicitudes',
    loadChildren: () =>
      import(
        '../../modulos/privado/administrador/solicitudes/solicitudes.module'
      ).then((m) => m.SolicitudesModule),
  },
  {
    path: 'roles',
    loadChildren: () =>
      import('../../modulos/privado/administrador/rol/rol.module').then(
        (m) => m.RolModule
      ),
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import(
        '../../modulos/privado/administrador/usuarios/usuarios.module'
      ).then((m) => m.UsuariosModule),
  },
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' },
];
