import { Router } from '@angular/router';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/mensajes-toast.func';
import { ToastrService } from 'ngx-toastr';
import { MensajesService } from './../../../../../servicios/mensajes.service';
import { observadorAny } from 'src/app/utilidades/observable/observable-any';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { map, Subscription, finalize, catchError } from 'rxjs';
import { TipoService } from './../../../../../servicios/tipo.service';
import { Tipo } from './../../../../../modelos/tipo';
import { AccesoService } from './../../../../../servicios/acceso.service';
import { Mensaje } from './../../../../../modelos/mensaje';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-mensaje-crear',
  templateUrl: './mensaje-crear.component.html',
  styleUrls: ['./mensaje-crear.component.css'],
})
export class MensajeCrearComponent implements OnInit {
  public objMensaje: Mensaje;
  public arregloTipos: Tipo[];

  //Atributos modales
  public modalTitulo: string;
  public modalContenido: string;
  public modalRef: BsModalRef;

  //Atributos consumo servicios
  public tmp: any;
  public miSuscripcion: Subscription;
  public cargaFinalizada: boolean;

  public searchBar = '';
  public defaultTipo = 'Seleccione el tipo';

  public arregloTipoClases = [
    { id: 1, nom: 'Peticion' },
    { id: 2, nom: 'Queja' },
    { id: 3, nom: 'Reclamo' },
    { id: 4, nom: 'Sugerencia' },
  ];

  constructor(
    private mensajesService: MensajesService,
    private accesoService: AccesoService,
    private tipoService: TipoService,
    public modalService: BsModalService,
    private toastr: ToastrService,
    public router: Router
  ) {
    //Inicializar atributos requeridos
    this.objMensaje = this.inicializarMensaje();
    this.arregloTipos = [];

    //Inicializar consumo de servicios
    this.miSuscripcion = this.tmp;
    this.cargaFinalizada = false;

    //Inicializar modales
    this.modalTitulo = '';
    this.modalContenido = '';
    this.modalRef = this.tmp;
  }

  ngOnInit(): void {
    this.obtenerTodosTipos();
    this.objMensaje.mensajeUsuario = this.accesoService.objAcceso.usuarioId;
  }

  public inicializarMensaje(): Mensaje {
    return new Mensaje(0, 0, 0,'','','',0);
  }

  public crearSolicitud(formulario: NgForm): void {
    console.log(this.objMensaje);
    this.miSuscripcion = this.mensajesService
      .registrarSolicitud(this.objMensaje)
      .pipe(
        map((respuesta) => {
          mostrarMensaje('success', 'Solicitud registrada', 'Exito', this.toastr);
          formulario.reset();
          this.router.navigate(['/estudiante/solicitudes']);
          return respuesta;
        }),
        catchError((miError) => {
          mostrarMensaje(
            'error',
            'La solicitud no pudo ser registrada',
            'Advertencia',
            this.toastr
          );
          throw miError;
        })
      )
      .subscribe(observadorAny);
  }

  public obtenerTodosTipos(): void {
    this.miSuscripcion = this.tipoService
      .cargarTipos()
      .pipe(
        map((resultado: Tipo[]) => {
          this.arregloTipos = resultado;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
          this.searchBar = '';
        })
      )
      .subscribe(observadorAny);
  }


}
