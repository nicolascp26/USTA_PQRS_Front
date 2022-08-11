import { Acceso } from './../../../../../modelos/acceso';
import { Rol } from '../../../../../modelos/rol';
import { Imagen } from '../../../../../modelos/imagen';
import { Usuario } from '../../../../../modelos/usuario';

import { ImagenService } from './../../../../../servicios/imagen.service';
import { RolService } from './../../../../../servicios/rol.service';
import { AccesoService } from './../../../../../servicios/acceso.service';
import { UsuarioService } from './../../../../../servicios/usuario.service';

import { mostrarMensaje } from 'src/app/utilidades/mensajes/mensajes-toast.func';
import { observadorAny } from 'src/app/utilidades/observable/observable-any';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { map, Subscription, finalize, catchError } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as cifrado from 'js-sha512';

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

  //Atributos Imagen
  public nuevaImagen: Imagen;
  public imagenSeleccionada: boolean;
  public base64: string;
  public tmpBase64: any;
  public cargaImagen: boolean;

  constructor(
    private usuarioService: UsuarioService,
    private accesoService: AccesoService,
    private rolService: RolService,
    private imgService: ImagenService,
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

  //Metodos de logica de negocio

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
  public seleccionarFoto(objeto: any): void {
    let caja = objeto.target.files[0];
    if (!caja || caja.length == 0) {
      return;
    }
    this.tmpBase64 = { fileName: caja.name, fileType: caja.type };
    this.nuevaImagen.imgNombrePublico = this.tmpBase64.fileName;
    this.nuevaImagen.imgTipo = this.tmpBase64.fileType;
    this.nuevaImagen.imgUsuarioId = this.usuarioSeleccionado.usuarioId;
    const reader = new FileReader();
    reader.readAsDataURL(caja);
    reader.onload = () => {
      this.tmpBase64 = reader.result;
      this.base64 = this.tmpBase64.split(',')[1];
      this.nuevaImagen.base64 = this.base64;
      this.imagenSeleccionada = true;
    };
    console.log(this.nuevaImagen);
  }

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
