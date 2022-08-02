import { observadorAny } from './../../../../../utilidades/observable/observable-any';
import { PreguntasFrecuentesService } from './../../../../../servicios/preguntas-frecuentes.service';
import { map, Subscription, finalize } from 'rxjs';
import { Pregunta } from './../../../../../modelos/pregunta';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preguntas-frecuentes',
  templateUrl: './preguntas-frecuentes.component.html',
  styleUrls: ['./preguntas-frecuentes.component.css']
})
export class PreguntasFrecuentesComponent implements OnInit {

  //Atributos requeridos
  public arregloPreguntas: Pregunta[];

  //Atributos consumo servicios
  public tmp: any;
  public miSuscripcion: Subscription;
  public cargaFinalizada: boolean;

  //Atributos de filtrado
  public searchBar = '';

  constructor(
    private preguntaService: PreguntasFrecuentesService
  ) {
    //Inicializar atributos requeridos
    this.arregloPreguntas = [];

    //Inicializar consumo de servicios
    this.miSuscripcion = this.tmp;
    this.cargaFinalizada = false;
  }

  ngOnInit(): void {
    this.obtenerPreguntas();
  }

  ngOnDestroy(): void {
    if (this.miSuscripcion) {
      this.miSuscripcion.unsubscribe();
    }
  }

  //Lógica del negocio
  public obtenerPreguntas(): void {
    this.miSuscripcion = this.preguntaService
      .cargarPreguntas()
      .pipe(
        map((resultado: Pregunta[]) => {
          this.arregloPreguntas = resultado;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
          //Deberíamos analizar la paginación
        })
      )
      .subscribe(observadorAny);
  }
}
