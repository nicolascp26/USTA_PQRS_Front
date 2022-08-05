import { mostrarMensaje } from 'src/app/utilidades/mensajes/mensajes-toast.func';
import { NgForm } from '@angular/forms';
import { observadorAny } from 'src/app/utilidades/observable/observable-any';
import { Pregunta } from './../../../../../modelos/pregunta';
import { ToastrService } from 'ngx-toastr';
import { PreguntasFrecuentesService } from './../../../../../servicios/preguntas-frecuentes.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { catchError, map, Subscription, finalize } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-preguntas-actualizar',
  templateUrl: './preguntas-actualizar.component.html',
  styleUrls: ['./preguntas-actualizar.component.css'],
})
export class PreguntasActualizarComponent implements OnInit {
  //Atributos requeridos
  public preguntaSeleccionada: Pregunta;

  //Atributos consumo servicios
  public tmp: any;
  public miSuscripcion: Subscription;
  public cargaFinalizada: boolean;

  //Atributos modales
  public modalTitulo: string;
  public modalContenido: string;
  public modalRef: BsModalRef;

  constructor(
    private preguntaService: PreguntasFrecuentesService,
    private ruta: ActivatedRoute,
    private router:Router,
    public modalService: BsModalService,
    private toastr: ToastrService
  ) {
    //Inicializar atributos requeridos
    this.preguntaSeleccionada = this.inicializarPregunta();
    //Inicializar consumo de servicios
    this.miSuscripcion = this.tmp;
    this.cargaFinalizada = false;
    //Inicializar modales
    this.modalTitulo = '';
    this.modalContenido = '';
    this.modalRef = this.tmp;
  }

  ngOnInit(): void {
    this.ruta.paramMap.subscribe((parametro: ParamMap) => {
      const miCodigo = String(parametro.get('prefId'));
      const miCodigoNumerico = parseFloat(miCodigo);
      this.obtenerPreguntaUnica(miCodigoNumerico);
    });
  }

  ngOnDestroy(): void {
    if (this.miSuscripcion) {
      this.miSuscripcion.unsubscribe();
    }
  }

  //Métodos obligatorios
  public inicializarPregunta(): Pregunta {
    return new Pregunta(0, '', '');
  }

  public obtenerPreguntaUnica(prefId: number): void {
    this.miSuscripcion = this.preguntaService
      .obtenerPreguntaUnica(prefId)
      .pipe(
        map((resultado: Pregunta) => {
          this.preguntaSeleccionada = resultado;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }

  public actualizarPregunta(formulario: NgForm): void {
    this.miSuscripcion = this.preguntaService
      .actualizarPregunta(this.preguntaSeleccionada)
      .pipe(
        map((respuesta) => {
          mostrarMensaje(
            'success',
            'Pregunta actualizada correctamente',
            'Satisfactorio',
            this.toastr
          );
          this.router.navigate(['/administrador/preguntas-frecuentes']);
          return respuesta;
        }),
        catchError((err) => {
          mostrarMensaje(
            'error',
            'No se pudo actualizar',
            'Fallo',
            this.toastr
          );
          throw err;
        })
      )
      .subscribe(observadorAny);
  }
}
