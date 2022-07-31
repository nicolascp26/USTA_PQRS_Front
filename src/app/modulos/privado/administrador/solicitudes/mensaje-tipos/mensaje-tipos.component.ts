import { mostrarMensaje } from 'src/app/utilidades/mensajes/mensajes-toast.func';
import { NgForm } from '@angular/forms';
import { observadorAny } from 'src/app/utilidades/observable/observable-any';
import { ToastrService } from 'ngx-toastr';
import { TipoService } from './../../../../../servicios/tipo.service';
import { map, Subscription, finalize, catchError } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Tipo } from './../../../../../modelos/tipo';
import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-mensaje-tipos',
  templateUrl: './mensaje-tipos.component.html',
  styleUrls: ['./mensaje-tipos.component.css'],
})
export class MensajeTiposComponent implements OnInit {
  //Atributos requeridos
  public arregloTipos: Tipo[];
  public objTipo: Tipo;
  public tipoSeleccionado: Tipo;

  public arregloTipoClases = [
    { id: 1, nom: 'Peticion' },
    { id: 2, nom: 'Queja' },
    { id: 3, nom: 'Reclamo' },
    { id: 4, nom: 'Sugerencia' },
  ];

  //Atributos paginación
  public paginaActual: number;
  public cantidadMostrar: number;
  public cantidadPaginas: number;
  public cantidadTotalRegistros: number;
  public searchBar = '';

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
    private tipoService: TipoService,
    public modalService: BsModalService,
    private miMensaje: ToastrService
  ) {
    //Inicializar atributos requeridos
    this.arregloTipos = [];
    //this.arregloEstados = ARREGLO_ESTADOS_ROL;
    this.tipoSeleccionado = this.inicializarTipo();
    this.objTipo = this.inicializarTipo();

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
  public inicializarTipo(): Tipo {
    return new Tipo(0, '', '', 0);
  }

  ngOnInit(): void {
    this.obtenerTodosTipos();
  }

  ngOnDestroy(): void {
    if (this.miSuscripcion) {
      this.miSuscripcion.unsubscribe();
    }
    if (this.miSuscripcionCrear) {
      this.miSuscripcionCrear.unsubscribe();
    }
    if (this.miSuscripcionEliminar) {
      this.miSuscripcionEliminar.unsubscribe();
    }
  }

  //Lógica del negocio
  public obtenerTodosTipos(): void {
    this.miSuscripcion = this.tipoService
      .cargarTipos()
      .pipe(
        map((resultado: Tipo[]) => {
          this.arregloTipos = resultado;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
          this.searchBar='';
        })
      )
      .subscribe(observadorAny);
  }

  public crearUnTipo(formulario: NgForm): void {
    this.miSuscripcionCrear = this.tipoService
      .crearTipo(this.objTipo)
      .pipe(
        map((respuesta) => {
          mostrarMensaje(
            'success',
            'Tipo de solicitud Creado',
            'Exito',
            this.miMensaje
          );
          this.obtenerTodosTipos();
          this.modalRef.hide();
          formulario.reset();
          return respuesta;
        }),
        catchError((miError) => {
          mostrarMensaje(
            'error',
            'Tipo de solicitud no pudo ser creado',
            'Advertencia',
            this.miMensaje
          );
          throw miError;
        })
      )
      .subscribe(observadorAny);
  }

  public actualizarTipo(formulario: NgForm): void {
    this.miSuscripcion = this.tipoService
      .actualizarTipo(this.tipoSeleccionado)
      .pipe(
        map((respuesta) => {
          mostrarMensaje(
            'success',
            'Tipo de solicitud actualizado correctamente',
            'Satisfactorio',
            this.miMensaje
          );
          this.obtenerTodosTipos();
          this.modalRef.hide();
          formulario.reset();
          return respuesta;
        }),
        catchError((err) => {
          mostrarMensaje(
            'error',
            'No se pudo actualizar',
            'Fallo',
            this.miMensaje
          );
          throw err;
        })
      )
      .subscribe(observadorAny);
  }

  public eliminarTipo(tipoID: number): void {
    this.miSuscripcionEliminar = this.tipoService
      .eliminarTipo(tipoID)
      .pipe(
        map((respuesta) => {
          this.obtenerTodosTipos();
          mostrarMensaje(
            'success',
            'Tipo de solicitud eliminado',
            'Exito',
            this.miMensaje
          );
          return respuesta;
        }),
        catchError((miError) => {
          mostrarMensaje(
            'error',
            'Tipo de solicitud no eliminado',
            'Advertencia',
            this.miMensaje
          );
          throw miError;
        })
      )
      .subscribe(observadorAny);
  }

  //Metodos Modales
  public abrirModalEliminar(template: TemplateRef<any>, objBorrar: Tipo): void {
    this.tipoSeleccionado = objBorrar;
    this.modalRef = this.modalService.show(template, { class: 'modal-alert' });
    this.modalTitulo = 'Advertencia';
    this.modalContenido =
      'Seguro que quieres eliminar ' + this.tipoSeleccionado.tipoNombre + '?';
  }

  public abrirModalCrear(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-alert' });
    this.modalTitulo = 'Crear nuevo tipo';
    this.modalContenido = 'Seguro que quiere crear este tipo de solicitud?';
  }

  public abrirModalActualizar(
    template: TemplateRef<any>,
    objActualizar: Tipo
  ): void {
    this.tipoSeleccionado = objActualizar;
    this.modalRef = this.modalService.show(template, { class: 'modal-alert' });
    this.modalTitulo = 'Actualizar tipo de solicitud';
    this.modalContenido = 'Guardar los cambios?';
  }

  public cancelar(): void {
    this.modalRef.hide();
  }

  public confirmarEliminar(): void {
    this.eliminarTipo(this.tipoSeleccionado.tipoId);
    this.tipoSeleccionado = this.inicializarTipo();
    this.modalRef.hide();
  }
}
