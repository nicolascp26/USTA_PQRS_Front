import { RolService } from './../../../../../servicios/rol.service';
import { observadorAny } from './../../../../../utilidades/observable/observable-any';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/mensajes-toast.func';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from './../../../../../servicios/usuario.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Usuario } from './../../../../../modelos/usuario';
import { Rol } from './../../../../../modelos/rol';
import { Subscription, finalize, map, catchError } from 'rxjs';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuarios-administrar',
  templateUrl: './usuarios-administrar.component.html',
  styleUrls: ['./usuarios-administrar.component.css'],
})
export class UsuariosAdministrarComponent implements OnInit {
  //Atributos requeridos
  public arregloUsuarios: Usuario[];
  public usuarioSeleccionado: Usuario;
  public arregloRoles: Rol[];
  public rolSeleccionado: any;

  //Atributos paginación
  public paginaActual: number;
  public cantidadMostrar: number;
  public cantidadPaginas: number;
  public cantidadTotal: number;
  public tamano = [5, 10, 15];

  //Atributos de filtrado
  public searchBar = '';
  public rolFiltrar: string = '';

  //Atributos de ordenacion
  public ordenarPor: string = '';
  public ordenadoSentido: boolean = false;

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
    private ruta: ActivatedRoute,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    public modalService: BsModalService,
    private miMensaje: ToastrService
  ) {
    //Inicializar atributos requeridos
    this.arregloUsuarios = [];
    this.arregloRoles = [];
    this.usuarioSeleccionado = this.inicializarUsuario();
    this.rolSeleccionado = this.inicializarRol();

    //Inicializar atributos paginación
    this.paginaActual = 1;
    this.cantidadMostrar = 5;
    this.cantidadPaginas = 0;
    this.cantidadTotal = 0;

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
    this.obtenerRoles();
    this.ruta.queryParamMap.subscribe((parametro) => {
      const rolQuery = String(parametro.get('rol'));
      if (rolQuery != 'null') {
        this.rolFiltrar = rolQuery;
      } else this.rolFiltrar = '';
    });
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
        map((respuesta: any) => {
          this.arregloUsuarios = respuesta.usuarios;
          this.cantidadTotal = respuesta.count;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
          this.cantidadPaginas = Math.ceil(
            this.cantidadTotal / this.cantidadMostrar
          );
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
          mostrarMensaje(
            'success',
            'Usuario eliminado',
            'Exito',
            this.miMensaje
          );
          return respuesta;
        }),
        catchError((miError) => {
          mostrarMensaje(
            'error',
            'Usuario no eliminado',
            'Advertencia',
            this.miMensaje
          );
          throw miError;
        })
      )
      .subscribe(observadorAny);
  }

  public obtenerRoles(): void {
    this.miSuscripcion = this.rolService
      .cargarRoles()
      .pipe(
        map((resultado: Rol[]) => {
          this.arregloRoles = resultado;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }

  //Metodo ordenar
  ordenarUsuarios(tipo: string): void {
    if (this.ordenadoSentido) {
      this.ordenarPor = tipo;
      this.ordenadoSentido = false;
    } else {
      this.ordenarPor = '-' + tipo;
      this.ordenadoSentido = true;
    }
  }

  //Metodos paginacion
  handlePageChange(event: number): void {
    this.paginaActual = event;
    this.obtenerUsuarios();
  }
  handlePageSizeChange(event: any): void {
    this.cantidadMostrar = event.target.value;
    this.paginaActual = 1;
    this.obtenerUsuarios();
  }
}
