import { RolService } from './../../../../../servicios/rol.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/mensajes-toast.func';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { observadorAny } from '../../../../../utilidades/observable/observable-any';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../../../../modelos/usuario';
import { Rol } from '../../../../../modelos/rol';
import { UsuarioService } from '../../../../../servicios/usuario.service';
import { Subscription, finalize, map, catchError } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-usuarios-actualizar',
  templateUrl: './usuarios-actualizar.component.html',
  styleUrls: ['./usuarios-actualizar.component.css'],
})
export class UsuariosActualizarComponent implements OnInit {
  //Atributos requeridos
  public usuarioSeleccionado: Usuario;
  public accesoSeleccionado: any;
  public rolSeleccionado: Rol;
  public arregloRoles: Rol[];

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
    public router: Router,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    public modalService: BsModalService,
    private miMensaje: ToastrService
  ) {
    //Inicializar Usuario
    this.usuarioSeleccionado = this.inicializarUsuario();
    this.rolSeleccionado = this.inicializarRol();
    this.arregloRoles = [];
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
      const miCodigo = String(parametro.get('usuarioId'));
      const miCodigoNumerico = parseFloat(miCodigo);
      this.obtenerUsuarioUnico(miCodigoNumerico);
      this.obtenerRoles();
    });
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

  public eliminarUsuario(usuarioId: number): void {
    this.miSuscripcion = this.usuarioService
      .eliminarUsuario(usuarioId)
      .pipe(
        map((respuesta) => {
          mostrarMensaje(
            'success',
            'Usuario eliminado Correctamente',
            'Satisfactorio',
            this.miMensaje
          );
          this.router.navigate(['/administrador/usuarios']);
          console.log(respuesta);
          return respuesta;
        }),
        catchError((err) => {
          mostrarMensaje(
            'error',
            'No se pudo eliminar',
            'Fallo',
            this.miMensaje
          );
          throw err;
        })
      )
      .subscribe(observadorAny);
  }

  public actualizarAcceso(formulario: NgForm): void {
    /*this.miSuscripcion = this.accesoService
      .obtenerAcceso()
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
      .subscribe(observadorAny);*/
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

  public abrirModalEliminar(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-alert' });
    this.modalTitulo = 'Advertencia';
    this.modalContenido = 'Seguro que quieres eliminar la cuenta?';
  }
  public cancelar(): void {
    this.modalRef.hide();
  }
  public confirmarEliminar(): void {
    this.eliminarUsuario(this.usuarioSeleccionado.usuarioId);
    this.modalRef.hide();
  }
}
