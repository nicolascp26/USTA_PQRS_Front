import { Router } from '@angular/router';
import { Pregunta } from './../../../../../modelos/pregunta';
import { PreguntasFrecuentesService } from './../../../../../servicios/preguntas-frecuentes.service';
import { observadorAny } from './../../../../../utilidades/observable/observable-any';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/mensajes-toast.func';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { catchError, map, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-preguntas-crear',
  templateUrl: './preguntas-crear.component.html',
  styleUrls: ['./preguntas-crear.component.css'],
})
export class PreguntasCrearComponent implements OnInit {
  //Atributos requeridos
  public objPregunta: Pregunta;

  //Atributos consumo servicios
  public tmp: any;
  public miSuscripcion: Subscription;
  public cargaFinalizada: boolean;

  constructor(
    private preguntaService: PreguntasFrecuentesService,
    private toastr: ToastrService,
    public router: Router
  ) {
    this.objPregunta = this.inicializarRol();
    //Inicializar consumo de servicios
    this.miSuscripcion = this.tmp;
    this.cargaFinalizada = false;
  }

  ngOnInit(): void {}

  //Métodos obligatorios
  public inicializarRol(): Pregunta {
    return new Pregunta(0, '', '');
  }

  public crearPregunta(formulario: NgForm): void {
    this.miSuscripcion = this.preguntaService
      .crearPregunta(this.objPregunta)
      .pipe(
        map((respuesta) => {
          mostrarMensaje('success', 'Rol Creado', 'Exito', this.toastr);
          this.router.navigate(['/administrador/preguntas-frecuentes']);
          formulario.reset();
          return respuesta;
        }),
        catchError((miError) => {
          mostrarMensaje(
            'error',
            'Rol no pudo ser creado',
            'Advertencia',
            this.toastr
          );
          throw miError;
        })
      )
      .subscribe(observadorAny);
  }
}
