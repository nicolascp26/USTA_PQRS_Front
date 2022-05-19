import { Acceso } from '../../../modelos/acceso';
import { AccesoService } from './../../../servicios/acceso.service';

import { ToastrService } from 'ngx-toastr';
import { mostrarMensaje } from './../../../utilidades/mensajes/mensajes-toast.func';
import * as cifrado from 'js-sha512';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css'],
})
export class AccesoComponent implements OnInit, OnDestroy {
  public accesoUsuarioSeleccionado: Acceso;
  public patronCorreo = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

  public tmp: any;
  public subscription: Subscription;

  constructor(
    public router: Router,
    public miMensaje: ToastrService,
    public route: ActivatedRoute,
    private accesoService: AccesoService
  ) {
    this.accesoUsuarioSeleccionado = this.inicializarAcceso();
    this.subscription = this.tmp;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {}

  // Métodos obligatorios
  // ****************************************************************************

  public inicializarAcceso(): Acceso {
    return new Acceso('', '');
  }
  // Lógica del negocio
  // ****************************************************************************

  public verificarDatos(formulario: NgForm): void {
    const correo = this.accesoUsuarioSeleccionado.correoUsuario;
    const miHash = cifrado.sha512(this.accesoUsuarioSeleccionado.claveUsuario);
    const acceso = new Acceso(correo, miHash);
    this.subscription = this.accesoService.iniciarSesion(acceso).subscribe(
      (res) => {
        mostrarMensaje(
          'success',
          'Autenticacion exitosa',
          'Bienvenido',
          this.miMensaje
        );
        localStorage.setItem('token', res.token as any);
        localStorage.setItem('foto', res.foto as any);
        this.router.navigate(['/administrador']);
      },
      (err) => {
        mostrarMensaje(
          'error',
          'No se pudo autenticar',
          'Vuelva a ingresar',
          this.miMensaje
        );
        formulario.reset();
      }
    );
  }
}
