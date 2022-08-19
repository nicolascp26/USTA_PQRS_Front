import { AccesoService } from './../../../../../servicios/acceso.service';
import { observadorAny } from './../../../../../utilidades/observable/observable-any';
import { Mensaje } from './../../../../../modelos/mensaje';
import { map, Subscription, finalize } from 'rxjs';
import { MensajesService } from './../../../../../servicios/mensajes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensaje-administrar',
  templateUrl: './mensaje-administrar.component.html',
  styleUrls: ['./mensaje-administrar.component.css'],
})
export class MensajeAdministrarComponent implements OnInit {
  //Atributos requeridos
  public solicitudSeleccionada: Mensaje;
  public accesoSeleccionado: any;
  public arregloSolicitudes: Mensaje[];

  //Atributos consumo de servicios
  public tmp: any;
  public miSuscripcion: Subscription;
  public cargaFinalizada: boolean;

  //Atributos paginación
  public paginaActual: number;
  public cantidadMostrar: number;
  public cantidadPaginas: number;
  public cantidadTotal: number;
  public tamano = [5, 10, 15];

  //Atributos de filtrado
  public searchBar = '';

  constructor(
    private mensajesService: MensajesService,
    private accesoService: AccesoService
  ) {
    //Inicializar atributos requeridos
    this.solicitudSeleccionada = this.inicializarMensaje();
    this.arregloSolicitudes = [];
    this.accesoSeleccionado = accesoService.objAcceso;

    //Inicializar atributos paginación
    this.paginaActual = 1;
    this.cantidadMostrar = 5;
    this.cantidadPaginas = 0;
    this.cantidadTotal = 0;

    //Inicializar consumo de servicios
    this.miSuscripcion = this.tmp;
    this.cargaFinalizada = false;
  }

  ngOnInit(): void {
    this.obtenerSolicitudes();
  }

  ngOnDestroy(): void {
    if (this.miSuscripcion) {
      this.miSuscripcion.unsubscribe();
    }
  }

  public inicializarMensaje(): Mensaje {
    return new Mensaje(0, 0, 0, '', '', '', 0, 0);
  }

  public seleccionarSolicitud(objMensaje: Mensaje): void {
    this.solicitudSeleccionada = objMensaje;
  }

  //Lógica del negocio
  public obtenerSolicitudes(): void {
    this.miSuscripcion = this.mensajesService
      .obtenerSolicitudesUsuario(this.accesoSeleccionado.usuarioId)
      .pipe(
        map((respuesta: any) => {
          this.arregloSolicitudes = respuesta.solicitudes;
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

  //Metodos paginacion
  handlePageChange(event: number): void {
    this.paginaActual = event;
    this.obtenerSolicitudes();
  }
}
