import { ErrorSeguridadComponent } from './../../modulos/privado/administrador/control/error-seguridad/error-seguridad.component';
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
  {
    path: 'preguntas-frecuentes',
    loadChildren: () =>
      import(
        '../../modulos/privado/administrador/preguntas/preguntas.module'
      ).then((m) => m.PreguntasModule),
  },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: '**', component: ErrorSeguridadComponent, pathMatch: 'full' },
];
