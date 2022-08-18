import {
  ADMINISTRADOR_BOTONES,
  ESTUDIANTE_BOTONES,
  DOCENTE_BOTONES,
} from './../../../../utilidades/botones-dinamicos/sidebar-dash-botones';
import { AccesoService } from './../../../../servicios/acceso.service';
import { Rol } from '../../../../modelos/rol';
import { Usuario } from '../../../../modelos/usuario';
import { Imagen } from '../../../../modelos/imagen';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-sidebar-dash',
  templateUrl: './sidebar-dash.component.html',
  styleUrls: ['./sidebar-dash.component.css'],
})
export class SidebarDashComponent implements OnInit {
  public usuarioSeleccionado: Usuario;
  public base64: string;
  public nombreUsuario: string | any;
  public rolUsuario: string | any;
  public botonesCargados: any = [];

  constructor(public accesoService: AccesoService) {
    this.usuarioSeleccionado = this.inicializarUsuario();
    this.base64 = localStorage.getItem('foto') as string;
    this.nombreUsuario = accesoService.objAcceso.usuarioNombres;
    this.rolUsuario = accesoService.objAcceso.usuarioRol;
    this.inicializarSidebar();
  }

  ngOnInit(): void {}

  public inicializarImagen(): Imagen {
    return new Imagen(0, 0, '', '', '', '');
  }

  public inicializarUsuario(): Usuario {
    return new Usuario(0, '', '', '', '', 0);
  }

  public inicializarRol(): Rol {
    return new Rol(0, '', 0);
  }

  public cerrarSesion(): void {
    this.accesoService.logout();
  }

  public inicializarSidebar(): void {
    switch (this.rolUsuario) {
      case 'Administrador':
        this.botonesCargados = ADMINISTRADOR_BOTONES;
        break;
      case 'Estudiante':
        this.botonesCargados = ESTUDIANTE_BOTONES;
        break;
      case 'Docente':
        this.botonesCargados = DOCENTE_BOTONES;
        break;
    }
  }
}
