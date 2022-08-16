import { mostrarMensaje } from 'src/app/utilidades/mensajes/mensajes-toast.func';
import { ToastrService } from 'ngx-toastr';
import { observadorAny } from './../../../../../utilidades/observable/observable-any';
import { catchError, map, Subscription, finalize } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Pregunta } from './../../../../../modelos/pregunta';
import { PreguntasFrecuentesService } from './../../../../../servicios/preguntas-frecuentes.service';
import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-preguntas-administrar',
  templateUrl: './preguntas-administrar.component.html',
  styleUrls: ['./preguntas-administrar.component.css'],
})
export class PreguntasAdministrarComponent implements OnInit {
  //Atributos requeridos
  public arregloPreguntas: Pregunta[];
  public preguntaSeleccionada: Pregunta;

  //Atributos modales
  public modalTitulo: string;
  public modalContenido: string;
  public modalRef: BsModalRef;

  //Atributos consumo servicios
  public tmp: any;
  public miSuscripcion: Subscription;
  public cargaFinalizada: boolean;

  //Atributos de filtrado
  public searchBar = '';

  constructor(
    private preguntaService: PreguntasFrecuentesService,
    public modalService: BsModalService,
    private toastr: ToastrService
  ) {
    //Inicializar atributos requeridos
    this.arregloPreguntas = [];
    this.preguntaSeleccionada = this.inicializarPregunta();

    //Inicializar modales
    this.modalTitulo = '';
    this.modalContenido = '';
    this.modalRef = this.tmp;

    //Inicializar consumo de servicios
    this.miSuscripcion = this.tmp;
    this.cargaFinalizada = false;
  }

  //Métodos obligatorios
  public inicializarPregunta(): Pregunta {
    return new Pregunta(0, '', '');
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

  public eliminarPregunta(preguntaId: number): void {
    this.miSuscripcion = this.preguntaService
      .eliminarPregunta(preguntaId)
      .pipe(
        map((respuesta) => {
          this.obtenerPreguntas();
          mostrarMensaje('success', 'Pregunta eliminada', 'Exito', this.toastr);
          return respuesta;
        }),
        catchError((miError) => {
          mostrarMensaje(
            'error',
            'Pregunta no eliminada',
            'Advertencia',
            this.toastr
          );
          throw miError;
        })
      )
      .subscribe(observadorAny);
  }

  //Metodos Modales
  public abrirModalEliminar(
    template: TemplateRef<any>,
    objBorrar: Pregunta
  ): void {
    this.preguntaSeleccionada = objBorrar;
    this.modalRef = this.modalService.show(template, { class: 'modal-alert' });
    this.modalTitulo = 'Advertencia';
    this.modalContenido =
      '¿Seguro que quieres eliminar: ' +
      this.preguntaSeleccionada.prefTitulo;
  }

  public cancelar(): void {
    this.modalRef.hide();
  }

  public confirmarEliminar(): void {
    this.eliminarPregunta(this.preguntaSeleccionada.prefId);
    this.preguntaSeleccionada = this.inicializarPregunta();
    this.modalRef.hide();
  }
}
