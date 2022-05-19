import { observadorAny } from './../../../../../utilidades/observable/observable-any';
import { Rol } from './../../../../../modelos/rol';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from './../../../../../servicios/usuario.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Usuario } from './../../../../../modelos/usuario';
import { Subscription, finalize, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-usuarios-administrar',
  templateUrl: './usuarios-administrar.component.html',
  styleUrls: ['./usuarios-administrar.component.css']
})
export class UsuariosAdministrarComponent implements OnInit {
//Atributos requeridos
public arregloUsuarios: Usuario[];
public objUsuario:Usuario;
public usuarioSeleccionado: Usuario;

//Atributos paginación
public paginaActual: number;
public cantidadMostrar: number;
public cantidadPaginas: number;
public cantidadTotalRegistros: number;

//Atributos modales
public modalTitulo: string;
public modalContenido: string;
public modalRef: BsModalRef;

//Atributos consumo servicios
public tmp: any;
public miSuscripcion: Subscription;
public miSuscripcionEliminar: Subscription;
public miSuscripcionCrear: Subscription;
public cargaFinalizada: boolean;

constructor(
  private usuarioService: UsuarioService,
  public modalService: BsModalService,
  private toastr: ToastrService
) {
  //Inicializar atributos requeridos
  this.arregloUsuarios = [];
  //this.arregloEstados = ARREGLO_ESTADOS_ROL;
  this.usuarioSeleccionado = this.inicializarUsuario();
  this.objUsuario = this.inicializarUsuario();

  //Inicializar atributos paginación
  this.paginaActual = 0;
  this.cantidadMostrar = 0;
  this.cantidadPaginas = 0;
  this.cantidadTotalRegistros = 0;

  //Inicializar modales
  this.modalTitulo = '';
  this.modalContenido = '';
  this.modalRef = this.tmp;

  //Inicializar consumo de servicios
  this.miSuscripcion = this.tmp;
  this.miSuscripcionEliminar = this.tmp;
  this.miSuscripcionCrear = this.tmp;
  this.cargaFinalizada = false;
}

//Métodos obligatorios
public inicializarUsuario(): Usuario {
  return new Usuario(0,'','','','',this.inicializarRol());
}

public inicializarRol(): Rol {
  return new Rol(0,'',0);
}

ngOnInit(): void {
  this.obtenerUsuarios();
}

ngOnDestroy(): void {
  if (this.miSuscripcion) {
    this.miSuscripcion.unsubscribe();
  }
}

  //Lógica del negocio
  public obtenerUsuarios(): void {
    this.miSuscripcion = this.usuarioService.cargarUsuarios()
      .pipe(
        map((resultado: Usuario[]) => {
          this.arregloUsuarios = resultado;
          console.log(this.arregloUsuarios);
        }),
        finalize(() => {
          this.cargaFinalizada = true;
          //Deberíamos analizar la paginación
        })
      )
      .subscribe(observadorAny);
  }

}
