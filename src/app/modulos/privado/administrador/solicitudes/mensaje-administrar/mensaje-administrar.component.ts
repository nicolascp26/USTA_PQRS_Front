import { observadorAny } from 'src/app/utilidades/observable/observable-any';
import { Subscription, finalize, map } from 'rxjs';
import { Mensaje } from './../../../../../modelos/mensaje';
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
  public arregloSolicitudes: Mensaje[];

  //Atributos consumo de servicios
  public tmp: any;
  public miSuscripcion: Subscription;
  public cargaFinalizada: boolean;

  //Atributos de filtrado
  public searchBar = '';

  constructor(private mensajesService: MensajesService) {
    //Inicializar atributos requeridos
    this.solicitudSeleccionada = this.inicializarMensaje();
    this.arregloSolicitudes = [];
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
      .obtenerSolicitudesAdmin()
      .pipe(
        map((resultado: Mensaje[]) => {
          this.arregloSolicitudes = resultado;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
          //Deberíamos analizar la paginación
        })
      )
      .subscribe(observadorAny);
  }
}
