import { mostrarMensaje } from 'src/app/utilidades/mensajes/mensajes-toast.func';
import { NgForm } from '@angular/forms';
import { observadorAny } from 'src/app/utilidades/observable/observable-any';
import { ToastrService } from 'ngx-toastr';
import { RolService } from './../../../../../servicios/rol.service';
import { AccesoService } from './../../../../../servicios/acceso.service';
import { UsuarioService } from './../../../../../servicios/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Rol } from '../../../../../modelos/rol';
import { map, Subscription, finalize, catchError } from 'rxjs';
import { Imagen } from '../../../../../modelos/imagen';
import { Usuario } from '../../../../../modelos/usuario';
import { Component, OnInit } from '@angular/core';
//import * as internal from 'stream';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
 //Atributos requeridos
 public usuarioSeleccionado: Usuario;
 public accesoSeleccionado: any;
 public arregloRoles: Rol[];
 public base64: string;

 //Atributos consumo servicios
 public tmp: any;
 public miSuscripcion: Subscription;
 public cargaFinalizada: boolean;

 //Atributos modales
 public modalTitulo: string;
 public modalContenido: string;
 public modalRef: BsModalRef;

 constructor(
   private ruta: ActivatedRoute,
   private usuarioService: UsuarioService,
   private accesoService: AccesoService,
   private rolService: RolService,
   private miMensaje: ToastrService
 ) {
   //Inicializar Usuario
   this.usuarioSeleccionado = this.inicializarUsuario();
   this.accesoSeleccionado = accesoService.objAcceso;
   this.arregloRoles = [];
   this.base64 = localStorage.getItem('foto') as string;
   //Inicializar consumo de servicios
   this.miSuscripcion = this.tmp;
   this.cargaFinalizada = false;
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

 public inicializarUsuario(): Usuario {
   return new Usuario(0, '', '', '', '', 0);
 }

 public inicializarRol(): Rol {
   return new Rol(0, '', 0);
 }

 public obtenerUsuarioUnico(usuarioId: number): void {
   this.miSuscripcion = this.usuarioService
     .obtenerUsuarioUnico(usuarioId)
     .pipe(
       map((resultado: Usuario) => {
         this.usuarioSeleccionado = resultado;
         console.log(this.usuarioSeleccionado);
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
           this.miMensaje
         );
         return respuesta;
       }),
       catchError((err) => {
         mostrarMensaje(
           'error',
           'No se pudo actualizar',
           'Fallo',
           this.miMensaje
         );
         throw err;
       })
     )
     .subscribe(observadorAny);
 }

 public actualizarAcceso(formulario: NgForm): void {
   this.miSuscripcion = this.accesoService
     .actualizarAcceso(this.accesoSeleccionado)
     .pipe(
       map((respuesta) => {
         mostrarMensaje(
           'success',
           'Datos de acceso actualizados correctamente',
           'Satisfactorio',
           this.miMensaje
         );
         return respuesta;
       }),
       catchError((err) => {
         mostrarMensaje(
           'error',
           'No se pudo actualizar',
           'Fallo',
           this.miMensaje
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

 public cancelar(): void {
   this.modalRef.hide();
 }

  /*Metodo para cargar la foto
  public seleccionarFoto(objeto: any): void {
    let caja = objeto.target.files[0];
    if (!caja || caja.length == 0) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(caja);
    reader.onload = () => {
      this.tmpBase64 = reader.result;
      this.foto = this.tmpBase64;
    };
  }*/
}
