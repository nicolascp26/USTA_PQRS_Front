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

  //Atributos de filtrado
  public searchBar = '';

  constructor(private mensajesService: MensajesService,private accesoService: AccesoService,) {
    //Inicializar atributos requeridos
    this.solicitudSeleccionada = this.inicializarMensaje();
    this.arregloSolicitudes = [];
    this.accesoSeleccionado = accesoService.objAcceso;
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
