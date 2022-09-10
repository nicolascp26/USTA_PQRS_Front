import { AnexosService } from './../../../../../servicios/anexos.service';
import { Mensaje } from './../../../../../modelos/mensaje';
import { Pregunta } from './../../../../../modelos/pregunta';

import { PreguntasFrecuentesService } from './../../../../../servicios/preguntas-frecuentes.service';
import { AccesoService } from './../../../../../servicios/acceso.service';
import { MensajesService } from './../../../../../servicios/mensajes.service';

import { mostrarMensaje } from 'src/app/utilidades/mensajes/mensajes-toast.func';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { observadorAny } from 'src/app/utilidades/observable/observable-any';
import { map, Subscription, finalize, catchError } from 'rxjs';
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
  public estadoSolicitud: number;
  public base64: string;
  public mensajeEnviado: boolean;
  public adminAsignado: string;

  //Atributos de respuesta con pregunta frecuente
  public arregloPreguntas: Pregunta[];
  public preguntaSeleccionada: Pregunta;

  //Atributos de anexos
  public tmpFile: any;
  public anexoEnviado: boolean;
  public arregloAnexos: any;

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
    private preguntaService: PreguntasFrecuentesService,
    private anexoService: AnexosService,
    public modalService: BsModalService,
    private toastr: ToastrService,
    private ruta: ActivatedRoute
  ) {
    //Inicializar atributos requeridos
    this.nuevoMensaje = this.inicializarMensaje();
    this.arregloHiloMensajes = [];
    this.usuarioId = accesoService.objAcceso.usuarioId;
    this.estadoSolicitud = 0;
    this.base64 = localStorage.getItem('foto') as string;
    this.mensajeEnviado = true;
    this.adminAsignado = this.tmp;
    //Inicializar atributos de preguntas frecuentes
    this.arregloPreguntas = [];
    this.preguntaSeleccionada = this.inicializarPregunta();

    //Inicializar atributos de subir anexos
    this.anexoEnviado = true;
    this.arregloAnexos = [];

    //Inicializar modales
    this.modalTitulo = '';
    this.modalContenido = '';
    this.modalRef = this.tmp;

    //Inicializar consumo de servicios
    this.miSuscripcion = this.tmp;
    this.cargaFinalizada = false;
  }

  //Metodos obligatorios
  ngOnInit(): void {
    this.ruta.paramMap.subscribe((parametro: ParamMap) => {
      const miCodigo = String(parametro.get('mensajeId'));
      const miCodigoNumerico = parseFloat(miCodigo);
      this.obtenerAnexos(miCodigoNumerico);
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

  public inicializarPregunta(): Pregunta {
    return new Pregunta(0, '', '');
  }

  //Lógica del negocio
  public obtenerHiloMensajes(mensajeId: number): void {
    this.miSuscripcion = this.mensajesService
      .obtenerHiloMensajes(mensajeId)
      .pipe(
        map((resultado: Mensaje[]) => {
          this.arregloHiloMensajes = resultado;
          this.estadoSolicitud = this.arregloHiloMensajes[0].mensajeEstado;
          this.adminAsignado =
            this.arregloHiloMensajes[1].usuarioNombres +
            ' ' +
            this.arregloHiloMensajes[1].usuarioApellidos;
        }),
        finalize(() => {
          this.obtenerPreguntasFrecuentes();
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
          this.nuevoMensaje.mensajeTitulo = '';
          this.preguntaSeleccionada = this.inicializarPregunta();
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
            miError.error.respuesta,
            'Advertencia',
            this.toastr
          );
          throw miError;
        })
      )
      .subscribe(observadorAny);
  }

  public obtenerPreguntasFrecuentes(): void {
    this.miSuscripcion = this.preguntaService
      .cargarPreguntas()
      .pipe(
        map((resultado: Pregunta[]) => {
          this.arregloPreguntas = resultado;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }

  //Metodos de las modales
  public cancelar(): void {
    this.preguntaSeleccionada = this.inicializarPregunta();
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

  public abrirModalPreguntasFrecuentes(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-alert' });
    this.modalTitulo = 'Contestar con pregunta frecuente:';
  }

  public confirmarPreguntaFrecuente(): void {
    this.nuevoMensaje.mensajeTitulo =
      'Re: Respuesta desde PREGUNTAS FRECUENTES';
    this.nuevoMensaje.mensajeDetalle = this.preguntaSeleccionada.prefDetalle;
    this.modalRef.hide();
  }

  public seleccionar(pregunta: Pregunta): void {
    this.preguntaSeleccionada = pregunta;
  }

  //Metodos de subir archivo
  public seleccionarAnexo(event: any): void {
    let caja = event.target.files[0];
    if (!caja || caja.length == 0) {
      return;
    }
    if (caja.size > 2097152) {
      mostrarMensaje(
        'error',
        'El archivo supera los 2MB',
        'Advertencia',
        this.toastr
      );
      return;
    } else
      this.tmpFile = {
        fileRaw: caja,
        fileName: caja.name,
        fileType: caja.type,
      };
  }

  public subirAnexo(formulario: NgForm): void {
    this.anexoEnviado = false;
    const body = new FormData();
    body.append('myFile', this.tmpFile.fileRaw, this.tmpFile.fileName);
    body.append('mensajeId', this.nuevoMensaje.mensajeCodpadre.toString());
    this.miSuscripcion = this.anexoService
      .subirAnexo(body)
      .pipe(
        map((respuesta) => {
          mostrarMensaje(
            'success',
            'Anexo subido correctamente',
            'Exito',
            this.toastr
          );
          return respuesta;
        }),
        finalize(() => {
          this.anexoEnviado = true;
          this.tmpFile = this.tmp;
          this.obtenerAnexos(this.nuevoMensaje.mensajeCodpadre);
        }),
        catchError((miError) => {
          mostrarMensaje(
            'error',
            'El archivo no pudo ser subido',
            'Advertencia',
            this.toastr
          );
          throw miError;
        })
      )
      .subscribe(observadorAny);
  }
  public obtenerAnexos(mensajeId: number): void {
    this.miSuscripcion = this.anexoService
      .obtenerAnexos(mensajeId)
      .pipe(
        map((resultado: any) => {
          this.arregloAnexos = resultado;
        }),
        finalize(() => {})
      )
      .subscribe(observadorAny);
  }
}
