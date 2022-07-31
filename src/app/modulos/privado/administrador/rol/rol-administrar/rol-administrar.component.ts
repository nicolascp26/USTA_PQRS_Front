import { NgForm } from '@angular/forms';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/mensajes-toast.func';
import { RolService } from './../../../../../servicios/rol.service';
import { observadorAny } from 'src/app/utilidades/observable/observable-any';
import { ToastrService } from 'ngx-toastr';
import { finalize, map, Subscription, catchError } from 'rxjs';
import { Rol } from './../../../../../modelos/rol';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-rol-administrar',
  templateUrl: './rol-administrar.component.html',
  styleUrls: ['./rol-administrar.component.css'],
})
export class RolAdministrarComponent implements OnInit {
  //Atributos requeridos
  public arregloRoles: Rol[];
  public objRol: Rol;
  public rolSeleccionado: Rol;

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
    private rolService: RolService,
    public modalService: BsModalService,
    private miMensaje: ToastrService
  ) {
    //Inicializar atributos requeridos
    this.arregloRoles = [];
    //this.arregloEstados = ARREGLO_ESTADOS_ROL;
    this.rolSeleccionado = this.inicializarRol();
    this.objRol = this.inicializarRol();

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
  public inicializarRol(): Rol {
    return new Rol(0, '', 0);
  }

  ngOnInit(): void {
    this.obtenerTodosRoles();
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
  public obtenerTodosRoles(): void {
    this.miSuscripcion = this.rolService
      .cargarRoles()
      .pipe(
        map((resultado: Rol[]) => {
          this.arregloRoles = resultado;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
          //Deberíamos analizar la paginación
        })
      )
      .subscribe(observadorAny);
  }

  public crearUnRol(formulario: NgForm): void {
    this.miSuscripcionCrear = this.rolService
      .crearRol(this.objRol)
      .pipe(
        map((respuesta) => {
          mostrarMensaje('success', 'Rol Creado', 'Exito', this.miMensaje);
          this.obtenerTodosRoles();
          this.modalRef.hide();
          formulario.reset();
          return respuesta;
        }),
        catchError((miError) => {
          mostrarMensaje(
            'error',
            'Rol no pudo ser creado',
            'Advertencia',
            this.miMensaje
          );
          throw miError;
        })
      )
      .subscribe(observadorAny);
  }

  public actualizarRol(formulario: NgForm): void {
    this.miSuscripcion = this.rolService
      .actualizarRol(this.rolSeleccionado)
      .pipe(
        map((respuesta) => {
          mostrarMensaje(
            'success',
            'Rol actualizado Correctamente',
            'Satisfactorio',
            this.miMensaje
          );
          this.obtenerTodosRoles();
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

  public eliminarRol(rolID: number): void {
    this.miSuscripcionEliminar = this.rolService
      .eliminarRol(rolID)
      .pipe(
        map((respuesta) => {
          this.obtenerTodosRoles();
          mostrarMensaje('success', 'Rol eliminado', 'Exito', this.miMensaje);
          return respuesta;
        }),
        catchError((miError) => {
          mostrarMensaje(
            'error',
            'Rol no eliminado',
            'Advertencia',
            this.miMensaje
          );
          throw miError;
        })
      )
      .subscribe(observadorAny);
  }

  //Metodos Modales
  public abrirModalEliminar(template: TemplateRef<any>, objBorrar: Rol): void {
    this.rolSeleccionado = objBorrar;
    this.modalRef = this.modalService.show(template, { class: 'modal-alert' });
    this.modalTitulo = 'Advertencia';
    this.modalContenido =
      'Seguro que quieres eliminar ' + this.rolSeleccionado.rolNombre + '?';
  }

  public abrirModalCrear(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-alert' });
    this.modalTitulo = 'Crear nuevo rol';
    this.modalContenido = 'Seguro que quiere crear este rol?';
  }

  public abrirModalActualizar(template: TemplateRef<any>, objActualizar: Rol): void {
    this.rolSeleccionado = objActualizar;
    this.modalRef = this.modalService.show(template, { class: 'modal-alert' });
    this.modalTitulo = 'Actualizar rol';
    this.modalContenido = 'Guardar los cambios?';
  }

  public cancelar(): void {
    this.modalRef.hide();
  }

  public confirmarEliminar(): void {
    this.eliminarRol(this.rolSeleccionado.rolId);
    this.rolSeleccionado = this.inicializarRol();
    this.modalRef.hide();
  }
}
