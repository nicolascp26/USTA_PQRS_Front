import { AnexosService } from './../../../../../servicios/anexos.service';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/mensajes-toast.func';
import { NgForm } from '@angular/forms';
import { observadorAny } from './../../../../../utilidades/observable/observable-any';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccesoService } from './../../../../../servicios/acceso.service';
import { MensajesService } from './../../../../../servicios/mensajes.service';
import { map, Subscription, finalize, catchError } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Mensaje } from './../../../../../modelos/mensaje';
import { Component, OnInit } from '@angular/core';

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

  //Atributos modales
  public modalTitulo: string;
  public modalContenido: string;
  public modalRef: BsModalRef;

  //Atributos de anexos
  public tmpFile: any;
  public anexoEnviado: boolean;
  public arregloAnexos: any;

  //Atributos consumo de servicios
  public tmp: any;
  public miSuscripcion: Subscription;
  public cargaFinalizada: boolean;

  constructor(
    private mensajesService: MensajesService,
    private accesoService: AccesoService,
    private anexoService: AnexosService,
    public modalService: BsModalService,
    private toastr: ToastrService,
    private ruta: ActivatedRoute
  ) {
    //Inicializar atributos requeridos
    this.nuevoMensaje = this.inicializarMensaje();
    this.arregloHiloMensajes = [];
    this.usuarioId = this.accesoService.objAcceso.usuarioId;
    this.estadoSolicitud = 0;
    this.base64 = localStorage.getItem('foto') as string;
    this.mensajeEnviado = true;

    //Inicializar modales
    this.modalTitulo = '';
    this.modalContenido = '';
    this.modalRef = this.tmp;

    //Inicializar atributos de subir anexos
    this.anexoEnviado = true;
    this.arregloAnexos = [];

    //Inicializar consumo de servicios
    this.miSuscripcion = this.tmp;
    this.cargaFinalizada = false;
  }

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

  public obtenerHiloMensajes(mensajeId: number): void {
    this.miSuscripcion = this.mensajesService
      .obtenerHiloMensajes(mensajeId)
      .pipe(
        map((resultado: Mensaje[]) => {
          this.arregloHiloMensajes = resultado;
          this.estadoSolicitud = this.arregloHiloMensajes[0].mensajeEstado;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }

  public responderMensaje(formulario: NgForm): void {
    this.mensajeEnviado = false;
    this.nuevoMensaje.mensajeEstado = 2;
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

  //Metodos de subir archivo
  public seleccionarAnexo(event: any): void {
    let caja = event.target.files[0];
    if (!caja || caja.length == 0) {
      return;
    }
    if (caja.size > 2097152) {
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
