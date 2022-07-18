import { observadorAny } from './../../../../../utilidades/observable/observable-any';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/mensajes-toast.func';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from './../../../../../servicios/usuario.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Usuario } from './../../../../../modelos/usuario';
import { Rol } from './../../../../../modelos/rol';
import { Subscription, finalize, map, catchError } from 'rxjs';
import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-usuarios-administrar',
  templateUrl: './usuarios-administrar.component.html',
  styleUrls: ['./usuarios-administrar.component.css'],
})
export class UsuariosAdministrarComponent implements OnInit {
  //Atributos requeridos
  public arregloUsuarios: Usuario[];
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
    this.cargaFinalizada = false;
  }

  //Métodos obligatorios
  public inicializarUsuario(): Usuario {
    return new Usuario(0, '', '', '', '', 0);
  }

  public inicializarRol(): Rol {
    return new Rol(0, '', 0);
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  ngOnDestroy(): void {
    if (this.miSuscripcion) {
      this.miSuscripcion.unsubscribe();
    }
  }

  public seleccionarUsuario(objUsuario: Usuario): void {
    this.usuarioSeleccionado = objUsuario;
  }

  //Lógica del negocio
  public obtenerUsuarios(): void {
    this.miSuscripcion = this.usuarioService
      .cargarUsuarios()
      .pipe(
        map((resultado: Usuario[]) => {
          this.arregloUsuarios = resultado;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
          //Deberíamos analizar la paginación
        })
      )
      .subscribe(observadorAny);
  }

  public eliminarUsuario(usuarioID: number): void {
    this.miSuscripcionEliminar = this.usuarioService
      .eliminarUsuario(usuarioID)
      .pipe(
        map((respuesta) => {
          this.obtenerUsuarios();
          mostrarMensaje('success', 'Usuario eliminado', 'Exito', this.toastr);
          return respuesta;
        }),
        catchError((miError) => {
          mostrarMensaje(
            'error',
            'Usuario no eliminado',
            'Advertencia',
            this.toastr
          );
          throw miError;
        })
      )
      .subscribe(observadorAny);
  }

  //Metodos Modales
  public abrirModalEliminar(template: TemplateRef<any>, objBorrar: Usuario): void {
    this.usuarioSeleccionado = objBorrar;
    this.modalRef = this.modalService.show(template, { class: 'modal-alert' });
    this.modalTitulo = 'Advertencia';
    this.modalContenido =
      'Seguro que quieres eliminar ' +
      this.usuarioSeleccionado.usuarioNombres +
      ' ' +
      this.usuarioSeleccionado.usuarioApellidos +
      '?';
  }

  public cancelar(): void {
    this.modalRef.hide();
  }

  public confirmarEliminar(): void {
    this.eliminarUsuario(this.usuarioSeleccionado.usuarioId);
    this.usuarioSeleccionado = this.inicializarUsuario();
    this.modalRef.hide();
  }
}
