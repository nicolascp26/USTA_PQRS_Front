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
}
