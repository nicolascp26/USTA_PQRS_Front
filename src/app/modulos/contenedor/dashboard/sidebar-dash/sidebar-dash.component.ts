import { AccesoService } from './../../../../servicios/acceso.service';
import { Rol } from '../../../../modelos/rol';
import { Usuario } from '../../../../modelos/usuario';
import { Imagen } from '../../../../modelos/imagen';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-dash',
  templateUrl: './sidebar-dash.component.html',
  styleUrls: ['./sidebar-dash.component.css']
})
export class SidebarDashComponent implements OnInit {

  public usuarioSeleccionado: Usuario;
  public base64: string;

  constructor(public accesoService:AccesoService) {
    this.usuarioSeleccionado = this.inicializarUsuario();
    this.base64 = localStorage.getItem('foto') as string;
   }

  ngOnInit(): void {
  }

  public inicializarImagen():Imagen{
    return new Imagen(0,this.inicializarUsuario(),'','','','');
  }

  public inicializarUsuario(): Usuario {
    return new Usuario(0,'','','','',this.inicializarRol());
  }

  public inicializarRol():Rol{
    return new Rol(0,'',0);
  }

  public cerrarSesion():void {
    this.accesoService.logout();
  }

}


