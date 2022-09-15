import { Acceso } from './../../../../../modelos/acceso';
import { Imagen } from './../../../../../modelos/imagen';
import { Usuario } from './../../../../../modelos/usuario';
import { Rol } from './../../../../../modelos/rol';

import { ImagenService } from './../../../../../servicios/imagen.service';
import { RolService } from './../../../../../servicios/rol.service';
import { AccesoService } from './../../../../../servicios/acceso.service';
import { UsuarioService } from './../../../../../servicios/usuario.service';

import { mostrarMensaje } from 'src/app/utilidades/mensajes/mensajes-toast.func';
import { NgForm } from '@angular/forms';
import { observadorAny } from 'src/app/utilidades/observable/observable-any';
import { ToastrService } from 'ngx-toastr';
import { map, Subscription, finalize, catchError } from 'rxjs';
import { Component, OnInit, TemplateRef } from '@angular/core';
import * as cifrado from 'js-sha512';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  //Atributos requeridos
  public usuarioSeleccionado: Usuario;
  public objAcceso: any;
  public arregloRoles: Rol[];

  //Atributos consumo servicios
  public tmp: any;
  public miSuscripcion: Subscription;
  public cargaFinalizada: boolean;
  public actualizaFinalizada: boolean;

  //Atributos modales
  public modalTitulo: string;
  public modalContenido: string;
  public modalRef: BsModalRef;

  //Atributos Imagen
  public nuevaImagen: Imagen;
  public imagenSeleccionada: boolean;
  public base64: any;
  public tmpBase64: any;
  public cargaImagen: boolean;

  //Atributos image cropper
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(
    private usuarioService: UsuarioService,
    private accesoService: AccesoService,
    private rolService: RolService,
    private imgService: ImagenService,
    public modalService: BsModalService,
    private toastr: ToastrService
  ) {
    //Inicializar Usuario
    this.usuarioSeleccionado = this.inicializarUsuario();
    this.objAcceso = this.accesoService.objAcceso;
    this.arregloRoles = [];

    //Inicializar imagen
    this.nuevaImagen = this.inicializarImagen();
    this.imagenSeleccionada = false;
    this.base64 = localStorage.getItem('foto') as string;
    this.cargaImagen = true;

    //Inicializar consumo de servicios
    this.miSuscripcion = this.tmp;
    this.cargaFinalizada = false;
    this.actualizaFinalizada = true;

    //Inicializar modales
    this.modalTitulo = '';
    this.modalContenido = '';
    this.modalRef = this.tmp;
  }

  ngOnInit(): void {
    this.obtenerUsuarioUnico(this.accesoService.objAcceso.usuarioId);
    this.obtenerRoles();
  }

  ngOnDestroy(): void {
    if (this.miSuscripcion) {
      this.miSuscripcion.unsubscribe();
    }
  }

  //Metodos obligatorios

  public inicializarUsuario(): Usuario {
    return new Usuario(0, '', '', '', '', 0);
  }

  public inicializarRol(): Rol {
    return new Rol(0, '', 0);
  }

  public inicializarImagen(): Imagen {
    return new Imagen(0, 0, '', '', '', '');
  }

  public obtenerUsuarioUnico(usuarioId: number): void {
    this.miSuscripcion = this.usuarioService
      .obtenerUsuarioUnico(usuarioId)
      .pipe(
        map((resultado: Usuario) => {
          this.usuarioSeleccionado = resultado;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }

  public actualizarUsuario(formulario: NgForm): void {
    this.actualizaFinalizada = false;
    this.miSuscripcion = this.usuarioService
      .actualizarUsuario(this.usuarioSeleccionado)
      .pipe(
        map((respuesta) => {
          mostrarMensaje(
            'success',
            'Usuario actualizado Correctamente',
            'Satisfactorio',
            this.toastr
          );
          return respuesta;
        }),
        finalize(() => {
          this.actualizaFinalizada = true;
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

  public actualizarClave(formulario: NgForm): void {
    this.actualizaFinalizada = false;
    const actual = cifrado.sha512(this.objAcceso.claveUsuario);
    const nueva = cifrado.sha512(this.objAcceso.nuevaClave);
    const acceso = new Acceso(
      this.accesoService.objAcceso.correoUsuario,
      actual
    );
    this.miSuscripcion = this.accesoService
      .actualizarClave(acceso, this.accesoService.objAcceso.usuarioId, nueva)
      .pipe(
        map((respuesta) => {
          mostrarMensaje(
            'success',
            'Contraseña actualizada correctamente',
            'Satisfactorio',
            this.toastr
          );
          formulario.reset();
          return respuesta;
        }),
        finalize(() => {
          this.actualizaFinalizada = true;
        }),
        catchError((err) => {
          mostrarMensaje(
            'error',
            'La contraseña actual no es correcta',
            'Fallo',
            this.toastr
          );
          throw err;
        })
      )
      .subscribe(observadorAny);
  }

  public obtenerRoles(): void {
    this.miSuscripcion = this.rolService
      .cargarRoles()
      .pipe(
        map((resultado: Rol[]) => {
          this.arregloRoles = resultado;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }

  //Metodos para cargar la foto

  public agregarImagenPerfil() {
    this.cargaImagen = false;
    this.miSuscripcion = this.imgService
      .agregarImagenPerfil(this.nuevaImagen)
      .pipe(
        map((respuesta) => {
          mostrarMensaje(
            'success',
            'Imagen de perfil actualizada',
            'Satisfactorio',
            this.toastr
          );
          return respuesta;
        }),
        finalize(() => {
          this.cargaImagen = true;
          this.imagenSeleccionada = false;
          localStorage.setItem('foto', this.base64);
          location.reload();
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

  //Metodos modal
  public abrirModalActualizar(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-alert' });
    this.modalTitulo = 'Cortar imagen';
    this.modalContenido = '¿Confirmar imagen?';
  }

  public cancelar(): void {
    this.croppedImage = '';
    this.imageChangedEvent = '';
    this.imagenSeleccionada = false;
    this.modalRef.hide();
  }

  public confirmarCortar(): void {
    this.base64 = this.croppedImage.split(',')[1];
    this.nuevaImagen.base64 = this.base64;
    this.modalRef.hide();
  }

  //Metodos de cropper
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    let caja = event.target.files[0];
    if (!caja || caja.length == 0) {
      return;
    }
    this.tmpBase64 = { fileName: caja.name, fileType: caja.type };
    this.nuevaImagen.imgNombrePublico = this.tmpBase64.fileName;
    this.nuevaImagen.imgTipo = this.tmpBase64.fileType;
    this.nuevaImagen.imgUsuarioId = this.usuarioSeleccionado.usuarioId;
    this.imagenSeleccionada = true;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
}
