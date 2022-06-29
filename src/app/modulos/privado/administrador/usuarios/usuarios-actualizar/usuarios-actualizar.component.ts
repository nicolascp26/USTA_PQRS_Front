import { mostrarMensaje } from 'src/app/utilidades/mensajes/mensajes-toast.func';
import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./usuarios-actualizar.component.css']
})
export class UsuariosActualizarComponent implements OnInit {
//Atributos requeridos
public objUsuario: Usuario;

//Atributos consumo servicios
public tmp: any;
public miSuscripcionCrear: Subscription;
public cargaFinalizada: boolean;

constructor(
  private usuarioService: UsuarioService,
  private toastr: ToastrService
) {
  //Inicializar Usuario
  this.objUsuario = this.inicializarUsuario();
  //Inicializar consumo de servicios
  this.miSuscripcionCrear = this.tmp;
  this.cargaFinalizada = false;
}

ngOnInit(): void {}

public inicializarUsuario(): Usuario {
  return new Usuario(0, '', '', '', '', this.inicializarRol());
}

public inicializarRol(): Rol {
  return new Rol(0, '', 0);
}

public crearUnRol(formulario: NgForm): void {
  this.miSuscripcionCrear = this.usuarioService
    .actualizarUsuario(this.objUsuario)
    .pipe(
      map((respuesta) => {
        mostrarMensaje('success', 'Usuario Creado', 'Exito', this.toastr);
        formulario.reset();
        return respuesta;
      }),
      catchError((miError) => {
        mostrarMensaje(
          'error',
          'Usuario no pudo ser creado',
          'Advertencia',
          this.toastr
        );
        throw miError;
      })
    )
    .subscribe(observadorAny);
}
}
