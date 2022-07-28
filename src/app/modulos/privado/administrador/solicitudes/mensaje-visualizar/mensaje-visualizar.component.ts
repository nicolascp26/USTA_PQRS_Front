import { observadorAny } from 'src/app/utilidades/observable/observable-any';
import { map, Subscription, finalize } from 'rxjs';
import { Mensaje } from './../../../../../modelos/mensaje';
import { MensajesService } from './../../../../../servicios/mensajes.service';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensaje-visualizar',
  templateUrl: './mensaje-visualizar.component.html',
  styleUrls: ['./mensaje-visualizar.component.css']
})
export class MensajeVisualizarComponent implements OnInit {

//Atributos requeridos
public mensajeSeleccionado: Mensaje;
public arregloHiloMensajes: Mensaje[];

//Atributos consumo de servicios
public tmp: any;
public miSuscripcion: Subscription;
public cargaFinalizada: boolean;

  constructor(private mensajesService:MensajesService,private ruta: ActivatedRoute,) {
    //Inicializar atributos requeridos
    this.mensajeSeleccionado = this.inicializarMensaje();
    this.arregloHiloMensajes = [];
    //Inicializar consumo de servicios
    this.miSuscripcion = this.tmp;
    this.cargaFinalizada = false;
  }

  ngOnInit(): void {
    this.ruta.paramMap.subscribe((parametro: ParamMap) => {
      const miCodigo = String(parametro.get('mensajeId'));
      const miCodigoNumerico = parseFloat(miCodigo);
      this.obtenerHiloMensajes(miCodigoNumerico);
    });
  }

  ngOnDestroy(): void {
    if (this.miSuscripcion) {
      this.miSuscripcion.unsubscribe();
    }
  }

  public inicializarMensaje(): Mensaje {
    return new Mensaje(0, '', '','','',0,0,0);
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

}
