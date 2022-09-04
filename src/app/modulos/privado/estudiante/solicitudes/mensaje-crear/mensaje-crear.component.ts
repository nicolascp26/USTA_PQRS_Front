import { AnexosService } from './../../../../../servicios/anexos.service';
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
  public envioFinalizado: boolean;

  //Atributos modales
  public modalTitulo: string;
  public modalContenido: string;
  public modalRef: BsModalRef;

  //Atributos de anexos
  public tmpFile: any;
  public anexoSeleccionado: boolean;
  public arregloAnexos: any;

  //Atributos consumo servicios
  public tmp: any;
  public miSuscripcion: Subscription;
  public cargaFinalizada: boolean;

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
    private anexoService: AnexosService,
    public modalService: BsModalService,
    private toastr: ToastrService,
    public router: Router
  ) {
    //Inicializar atributos requeridos
    this.objMensaje = this.inicializarMensaje();
    this.arregloTipos = [];
    this.envioFinalizado = true;

    //Inicializar atributos de subir anexos
    this.anexoSeleccionado = false;
    this.arregloAnexos = [];

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
    return new Mensaje(0, 0, 0, '', '', '', 0);
  }

  public crearSolicitud(formulario: NgForm): void {
    this.envioFinalizado = false;
    this.miSuscripcion = this.mensajesService
      .registrarSolicitud(this.objMensaje)
      .pipe(
        map((respuesta: any) => {
          mostrarMensaje(
            'success',
            'Solicitud registrada',
            'Exito',
            this.toastr
          );
          if (this.anexoSeleccionado) {
            this.subirAnexo(respuesta.resultado.mensajeId);
          }
          formulario.reset();
          this.router.navigate(['/estudiante/solicitudes']);
          return respuesta;
        }),
        finalize(() => {
          this.envioFinalizado = true;
        }),
        catchError((miError) => {
          mostrarMensaje(
            'error',
            miError.error.respuesta,
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
        })
      )
      .subscribe(observadorAny);
  }

  //Metodos de subir archivo
  public seleccionarAnexo(event: any): void {
    let caja = event.target.files[0];
    if (!caja || caja.length == 0) {
      this.anexoSeleccionado = false;
      return;
    }
    if (caja.size > 2097152) {
      this.tmpFile = this.tmp;
      mostrarMensaje(
        'error',
        'El archivo pesa mas de 2MB',
        'Advertencia',
        this.toastr
      );
      this.anexoSeleccionado = false;
      return;
    } else {
      this.tmpFile = {
        fileRaw: caja,
        fileName: caja.name,
        fileType: caja.type,
      };
      this.anexoSeleccionado = true;
    }
  }

  public subirAnexo(mensajeId: number): void {
    const body = new FormData();
    body.append('myFile', this.tmpFile.fileRaw, this.tmpFile.fileName);
    body.append('mensajeId', mensajeId.toString());
    this.miSuscripcion = this.anexoService
      .subirAnexo(body)
      .pipe(
        map((respuesta) => {
          return respuesta;
        }),
        finalize(() => {
          this.tmpFile = this.tmp;
        }),
        catchError((miError) => {
          throw miError;
        })
      )
      .subscribe(observadorAny);
  }
}
