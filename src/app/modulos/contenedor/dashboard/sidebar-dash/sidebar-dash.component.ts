import { observadorAny } from './../../../../utilidades/observable/observable-any';
import { UsuarioService } from './../../../../servicios/usuario.service';
import {
  ADMINISTRADOR_BOTONES,
  ESTUDIANTE_BOTONES,
  DOCENTE_BOTONES,
  INVITADO_BOTONES,
} from './../../../../utilidades/botones-dinamicos/sidebar-dash-botones';
import { AccesoService } from './../../../../servicios/acceso.service';
import { Rol } from '../../../../modelos/rol';
import { Usuario } from '../../../../modelos/usuario';
import { Imagen } from '../../../../modelos/imagen';
import { Component, OnInit } from '@angular/core';
import { map, Subscription, finalize } from 'rxjs';

@Component({
  selector: 'app-sidebar-dash',
  templateUrl: './sidebar-dash.component.html',
  styleUrls: ['./sidebar-dash.component.css'],
})
export class SidebarDashComponent implements OnInit {
  //Atributos obligatorios
  public usuarioSeleccionado: Usuario;
  public base64: string;
  public nombreUsuario: string | any;
  public rolUsuario: string | any;
  public botonesCargados: any = [];
  public estadisticas: [] | any;

  //Atributos consumo de servicios
  public miSuscripcion: Subscription;
  public cargaFinalizada: boolean;
  public tmp: any;

  constructor(
    public accesoService: AccesoService,
    private usuarioService: UsuarioService
  ) {
    //Inicializar atributos obligatorios
    this.usuarioSeleccionado = this.inicializarUsuario();
    this.base64 = localStorage.getItem('foto') as string;
    this.nombreUsuario = accesoService.objAcceso.usuarioNombres;
    this.rolUsuario = accesoService.objAcceso.usuarioRol;
    this.inicializarSidebar();

    //Inicializar consumo de servicios
    this.miSuscripcion = this.tmp;
    this.cargaFinalizada = false;
  }

  ngOnInit(): void {
    switch (this.rolUsuario) {
      case 'Administrador':
        this.obtenerEstadisticasAdmin();
        break;
      case 'Estudiante':
        this.obtenerEstadisticasUsuario(this.accesoService.objAcceso.usuarioId);
        break;
      case 'Docente':
        this.obtenerEstadisticasAdmin();
        break;
      case 'Invitado':
        break;
    }
  }

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
      case 'Invitado':
        this.botonesCargados = INVITADO_BOTONES;
        break;
    }
  }

  //Lógica del negocio
  public obtenerEstadisticasAdmin(): void {
    this.miSuscripcion = this.usuarioService
      .estadisticasAdmin()
      .pipe(
        map((resultado: any[]) => {
          this.estadisticas = resultado;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }

  public obtenerEstadisticasUsuario(usuarioId: number): void {
    this.miSuscripcion = this.usuarioService
      .estadisticasUsuario(usuarioId)
      .pipe(
        map((resultado: any[]) => {
          this.estadisticas = resultado;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }
}
