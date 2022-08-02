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
  styleUrls: ['./mensaje-visualizar.component.css']
})
export class MensajeVisualizarComponent implements OnInit {

  //Atributos requeridos
  public nuevoMensaje: Mensaje;
  public arregloHiloMensajes: Mensaje[];
  public usuarioId: number;

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
    return new Mensaje(0, 0, 0, '', '', '', 0, 0);
  }

  public obtenerHiloMensajes(mensajeId: number): void {
    this.miSuscripcion = this.mensajesService
      .obtenerHiloMensajes(mensajeId)
      .pipe(
        map((resultado: Mensaje[]) => {
          this.arregloHiloMensajes = resultado;
          console.log(this.arregloHiloMensajes);
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }

  public responderMensaje(formulario: NgForm): void {
    this.miSuscripcion = this.mensajesService
      .responderMensaje(this.nuevoMensaje)
      .pipe(
        map((respuesta) => {
          mostrarMensaje('success', 'Mensaje enviado', 'Exito', this.toastr);
          this.obtenerHiloMensajes(this.nuevoMensaje.mensajeCodpadre);
          formulario.reset();
          return respuesta;
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
}
