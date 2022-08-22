export const ADMINISTRADOR_BOTONES: any = [
  { id: 1, name: 'Inicio', icon: 'fa fa-home', route: '/administrador/inicio' },
  { id: 2, name: 'Solicitudes', icon: 'fa fa-clipboard-list', route: '/administrador/solicitudes' },
  { id: 3, name: 'Usuarios', icon: 'fa fa-users-gear', route: '/administrador/usuarios' },
  { id: 4, name: 'Roles', icon: 'fa fa-solid fa-user-group', route: '/administrador/roles' },
  { id: 5, name: 'Tipos de solicitudes', icon: 'fa fa-solid fa-envelope', route: '/administrador/solicitudes/tipos' },
  { id: 6, name: 'Preguntas frecuentes', icon: 'fa fa-question-circle', route: '/administrador/preguntas-frecuentes' }
];

export const ESTUDIANTE_BOTONES: any = [
  { id: 1, name: 'Inicio', icon: 'fa fa-home', route: '/estudiante/inicio' },
  { id: 2, name: 'Nueva solicitud', icon: 'fa fa-plus', route: '/estudiante/solicitudes/crear' },
  { id: 3, name: 'Mis solicitudes', icon: 'fa fa-clipboard-list', route: '/estudiante/solicitudes' },
  { id: 4, name: 'Preguntas frecuentes', icon: 'fa fa-question-circle', route: '/estudiante/inicio/preguntas-frecuentes' }
];

export const DOCENTE_BOTONES: any = [
  { id: 1, name: 'Inicio', icon: 'fa fa-home', route: '/administrador/inicio' },
  { id: 2, name: 'Solicitudes', icon: 'fa fa-clipboard-list', route: '/administrador/solicitudes' },
  { id: 3, name: 'Preguntas frecuentes', icon: 'fa fa-question-circle', route: '/administrador/preguntas-frecuentes' }
];

export const INVITADO_BOTONES: any = [
  { id: 1, name: 'Inicio', icon: 'fa fa', route: '/inicio' },
  { id: 2, name: 'Preguntas frecuentes', icon: 'fa fa-question-circle', route: '/estudiante/inicio/preguntas-frecuentes' }
];
