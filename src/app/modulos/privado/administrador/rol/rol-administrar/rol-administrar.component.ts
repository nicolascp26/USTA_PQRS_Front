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
  //public arregloEstados: any[];
  public rolSeleccionado: Rol;

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
    private rolService: RolService,
    public modalService: BsModalService,
    private toastr: ToastrService
  ) {
    //Inicializar atributos requeridos
    this.arregloRoles = [];
    //this.arregloEstados = ARREGLO_ESTADOS_ROL;
    this.rolSeleccionado = this.inicializarRol();

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
  public inicializarRol(): Rol {
    return new Rol(0, '',0);
  }

  ngOnInit(): void {
    this.obtenerTodosRoles();
  }

  ngOnDestroy(): void {
    if (this.miSuscripcion) {
      this.miSuscripcion.unsubscribe();
    }
  }

  //Lógica del negocio
  public obtenerTodosRoles(): void {
    this.miSuscripcion = this.rolService
      .cargarRoles()
      .pipe(
        map((resultado: Rol[]) => {
          this.arregloRoles = resultado;
          console.log(this.arregloRoles);
        }),
        finalize(() => {
          this.cargaFinalizada = true;
          //Deberíamos analizar la paginación
        })
      )
      .subscribe(observadorAny);
  }

  public eliminarRol(rolID:number): void {
    this.miSuscripcionEliminar = this.rolService
      .eliminarRol(rolID)
      .pipe(
        map((respuesta)=>{
          this.obtenerTodosRoles();
          mostrarMensaje('success','Rol eliminado','Exito',this.toastr);
          return respuesta;
        }),
        catchError((miError) => {
          mostrarMensaje('error','Rol no eliminado','Advertencia',this.toastr);
          throw miError;
        })
      )
      .subscribe(observadorAny);
  }

  //Metodos Modales
  public abrirModal(template: TemplateRef<any>, objBorrar: Rol): void {
    this.rolSeleccionado = objBorrar;
    this.modalRef = this.modalService.show(template, { class: 'modal-alert' });
    this.modalTitulo = 'Advertencia';
    this.modalContenido =
      'Seguro que quieres eliminar ' + this.rolSeleccionado.rolNombre + '?';
  }

  public cancelarEliminar(): void {
    this.modalRef.hide();
  }

  public confirmarEliminar(): void {
    this.eliminarRol(this.rolSeleccionado.rolId);
    this.rolSeleccionado= this.inicializarRol();
    this.modalRef.hide();
  }
}
