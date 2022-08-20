import { AccesoService } from './../../../../../servicios/acceso.service';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/mensajes-toast.func';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { observadorAny } from 'src/app/utilidades/observable/observable-any';
import { map, Subscription, finalize, catchError } from 'rxjs';
import { Mensaje } from './../../../../../modelos/mensaje';
import { MensajesService } from './../../../../../servicios/mensajes.service';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-mensaje-visualizar',
  templateUrl: './mensaje-visualizar.component.html',
  styleUrls: ['./mensaje-visualizar.component.css'],
})
export class MensajeVisualizarComponent implements OnInit {
  //Atributos requeridos
  public nuevoMensaje: Mensaje;
  public arregloHiloMensajes: Mensaje[];
  public usuarioId: number;
  public base64: string;
  public mensajeEnviado: boolean;

  //Atributos modales
  public modalTitulo: string;
  public modalContenido: string;
  public modalRef: BsModalRef;

  //Atributos consumo de servicios
  public tmp: any;
  public miSuscripcion: Subscription;
  public cargaFinalizada: boolean;

  constructor(
    private mensajesService: MensajesService,
    private accesoService: AccesoService,
    public modalService: BsModalService,
    private toastr: ToastrService,
    private ruta: ActivatedRoute
  ) {
    //Inicializar atributos requeridos
    this.nuevoMensaje = this.inicializarMensaje();
    this.arregloHiloMensajes = [];
    this.usuarioId = accesoService.objAcceso.usuarioId;
    this.base64 = localStorage.getItem('foto') as string;
    this.mensajeEnviado = true;

    //Inicializar modales
    this.modalTitulo = '';
    this.modalContenido = '';
    this.modalRef = this.tmp;

    //Inicializar consumo de servicios
    this.miSuscripcion = this.tmp;
    this.cargaFinalizada = false;
  }

  ngOnInit(): void {
    this.ruta.paramMap.subscribe((parametro: ParamMap) => {
      const miCodigo = String(parametro.get('mensajeId'));
      const miCodigoNumerico = parseFloat(miCodigo);
      this.obtenerHiloMensajes(miCodigoNumerico);
      this.nuevoMensaje.mensajeCodpadre = miCodigoNumerico;
      this.nuevoMensaje.mensajeUsuario = this.usuarioId;
    });
  }

  ngOnDestroy(): void {
    if (this.miSuscripcion) {
      this.miSuscripcion.unsubscribe();
    }
  }

  public inicializarMensaje(): Mensaje {
    return new Mensaje(0, 0, 0, '', '', '', 0);
  }

  public obtenerHiloMensajes(mensajeId: number): void {
    this.miSuscripcion = this.mensajesService
      .obtenerHiloMensajes(mensajeId)
      .pipe(
        map((resultado: Mensaje[]) => {
          this.arregloHiloMensajes = resultado;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }

  public responderMensaje(formulario: NgForm): void {
    this.mensajeEnviado = false;
    this.nuevoMensaje.mensajeEstado = 3;
    this.miSuscripcion = this.mensajesService
      .responderMensaje(this.nuevoMensaje)
      .pipe(
        map((respuesta) => {
          mostrarMensaje('success', 'Mensaje enviado', 'Exito', this.toastr);
          this.obtenerHiloMensajes(this.nuevoMensaje.mensajeCodpadre);
          formulario.reset();
          return respuesta;
        }),
        finalize(() => {
          this.mensajeEnviado = true;
        }),
        catchError((miError) => {
          mostrarMensaje(
            'error',
            'El mensaje no fue enviado',
            'Advertencia',
            this.toastr
          );
          throw miError;
        })
      )
      .subscribe(observadorAny);
  }

  public terminarSolicitud(): void {
    this.miSuscripcion = this.mensajesService
      .terminarSolicitud(this.nuevoMensaje)
      .pipe(
        map((respuesta) => {
          mostrarMensaje(
            'success',
            'Solicitud Terminada',
            'Exito',
            this.toastr
          );
          this.obtenerHiloMensajes(this.nuevoMensaje.mensajeCodpadre);
          return respuesta;
        }),
        catchError((miError) => {
          mostrarMensaje(
            'error',
            'La solicitud no fue terminada',
            'Advertencia',
            this.toastr
          );
          throw miError;
        })
      )
      .subscribe(observadorAny);
  }

  public reabrirSolicitud(): void {
    this.miSuscripcion = this.mensajesService
      .reabrirSolicitud(this.nuevoMensaje)
      .pipe(
        map((respuesta) => {
          mostrarMensaje(
            'success',
            'Solicitud Reabierta',
            'Exito',
            this.toastr
          );
          this.obtenerHiloMensajes(this.nuevoMensaje.mensajeCodpadre);
          return respuesta;
        }),
        catchError((miError) => {
          mostrarMensaje(
            'error',
            'La solicitud no fue reabierta',
            'Advertencia',
            this.toastr
          );
          throw miError;
        })
      )
      .subscribe(observadorAny);
  }

  //Metodos de las modales
  public cancelar(): void {
    this.modalRef.hide();
  }

  public abrirModalTerminar(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-alert' });
    this.modalTitulo = 'Advertencia';
    this.modalContenido = '¿Seguro que quieres terminar la solicitud?';
  }

  public confirmarTerminar(): void {
    this.terminarSolicitud();
    this.modalRef.hide();
  }

  public abrirModalReabrir(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-alert' });
    this.modalTitulo = 'Advertencia';
    this.modalContenido = '¿Seguro que quieres reabrir la solicitud?';
  }

  public confirmarReabrir(): void {
    this.reabrirSolicitud();
    this.modalRef.hide();
  }
}
