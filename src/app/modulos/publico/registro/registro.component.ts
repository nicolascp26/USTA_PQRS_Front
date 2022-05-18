import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from './../../../servicios/usuario.service';
import { Location } from '@angular/common';
import { catchError, map, Subscription } from 'rxjs';
import { Acceso } from './../../../modelos/acceso';
import { Rol } from './../../../modelos/rol';
import { Usuario } from './../../../modelos/usuario';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as cifrado from 'js-sha512';
import { observadorAny } from 'src/app/utilidades/observable/observable-any';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/mensajes-toast.func';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit, OnDestroy {
  public objUsuario: Usuario;
  public objAcceso: Acceso;
  public patronCorreo: string;

  public subscription: Subscription;
  public tmp: any;
  constructor(
    private usuarioService: UsuarioService,
    private miMensaje: ToastrService,
    private router: Router,
    private destino:Location
  ) {
    this.objUsuario = this.inicializarUsuario();
    this.objAcceso = this.inicializarAcceso();
    this.patronCorreo = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
    this.subscription = this.tmp;

  }

  ngOnInit(): void {}

  //El siguiente metodo hace parte del ciclo de vida de angular y se aplica al destruir el componente con el fin de cancelar la subcripcion al servicio
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public regresar(): void {
    this.destino.back();
  }

  // metodos obligatorios ****

  public inicializarUsuario(): Usuario {
    return new Usuario(0, '', '', '', '', this.inicializarRol());
  }
  public inicializarRol(): Rol {
    return new Rol(0, '',0);
  }
  public inicializarAcceso(): Acceso {
    return new Acceso('', '');
  }

  public registrarUsuario(formulario: NgForm): void {
    const correo = this.objAcceso.correoUsuario;
    const miHash = cifrado.sha512(this.objAcceso.claveUsuario);
    const acceso = new Acceso(correo, miHash);

    this.subscription = this.usuarioService
      .registrarUsuario(this.objUsuario, acceso)
      .pipe(
        map((respuesta) => {
          mostrarMensaje(
            'success',
            'Registrado Correctamente',
            'Satisfactorio',
            this.miMensaje
          );
          this.router.navigate(['/landing/acceso']);
          return respuesta;
        }),
        catchError((err) => {
          mostrarMensaje(
            'error',
            'No se pudo registrar',
            'Fallo',
            this.miMensaje
          );
          formulario.reset();
          this.objAcceso = this.inicializarAcceso();
          this.objUsuario = this.inicializarUsuario();
          throw err;
        })
      )
      .subscribe(observadorAny);
  }
}
