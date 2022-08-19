import { observadorAny } from 'src/app/utilidades/observable/observable-any';
import { Subscription, finalize, map } from 'rxjs';
import { Mensaje } from './../../../../../modelos/mensaje';
import { MensajesService } from './../../../../../servicios/mensajes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mensaje-administrar',
  templateUrl: './mensaje-administrar.component.html',
  styleUrls: ['./mensaje-administrar.component.css'],
})
export class MensajeAdministrarComponent implements OnInit {
  //Atributos requeridos
  public solicitudSeleccionada: Mensaje;
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
  public searchBar: string = '';
  public solicitudFiltrarEstado: number = 0;
  public arregloEstados = [
    { id: 1, nom: 'Nueva' },
    { id: 2, nom: 'En progreso' },
    { id: 3, nom: 'Terminada' }
  ];

  constructor(private ruta: ActivatedRoute,private mensajesService: MensajesService) {
    //Inicializar atributos requeridos
    this.solicitudSeleccionada = this.inicializarMensaje();
    this.arregloSolicitudes = [];

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
    this.ruta.queryParamMap.subscribe((parametro) => {
      const estadoQuery = String(parametro.get('estado'));
      const estadoNumerico = parseFloat(estadoQuery);
      console.log(estadoNumerico);
      if (estadoNumerico != null) {
        this.solicitudFiltrarEstado = estadoNumerico;
      } else this.solicitudFiltrarEstado = NaN;
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

  public seleccionarSolicitud(objMensaje: Mensaje): void {
    this.solicitudSeleccionada = objMensaje;
  }

  //Lógica del negocio
  public obtenerSolicitudes(): void {
    this.miSuscripcion = this.mensajesService
      .obtenerSolicitudesAdmin()
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
  handlePageSizeChange(event: any): void {
    this.cantidadMostrar = event.target.value;
    this.paginaActual = 1;
    this.obtenerSolicitudes();
  }

  handlePageSizeFilter(event: any): void {
    this.paginaActual = event;
    this.obtenerSolicitudes();
  }
}
