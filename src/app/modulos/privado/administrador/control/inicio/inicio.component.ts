import { observadorAny } from './../../../../../utilidades/observable/observable-any';
import { UsuarioService } from './../../../../../servicios/usuario.service';
import { AccesoService } from './../../../../../servicios/acceso.service';
import { Component, OnInit } from '@angular/core';
import { map, finalize, Subscription } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  public nombreUsuario: string | any;
  public rolUsuario:string | any;
  public idUsuario: number | any;
  public estadisticas: [] | any;

  public miSuscripcion: Subscription;
  public cargaFinalizada: boolean;
  public tmp: any;

  constructor(
    public accesoService: AccesoService,
    private usuarioService: UsuarioService
  ) {
    //Inicializar atributos
    this.nombreUsuario = accesoService.objAcceso.usuarioNombres;
    this.rolUsuario =this.accesoService.objAcceso.usuarioRol;
    this.idUsuario = accesoService.objAcceso.usuarioId;
    //Inicializar consumo de servicios
    this.miSuscripcion = this.tmp;
    this.cargaFinalizada = false;
  }

  ngOnInit(): void {
    switch (this.rolUsuario) {
      case 'Administrador':
        this.obtenerEstadisticas();
        break;
      case 'Docente':
        this.obtenerEstadisticasDocente();
        break;
      }
  }

  //Lógica del negocio
  public obtenerEstadisticas(): void {
    this.miSuscripcion = this.usuarioService
      .estadisticasAdmin()
      .pipe(
        map((resultado: any[]) => {
          this.estadisticas = resultado;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }

  public obtenerEstadisticasDocente(): void {
    this.miSuscripcion = this.usuarioService
      .estadisticasDocente(this.idUsuario)
      .pipe(
        map((resultado: any[]) => {
          this.estadisticas = resultado;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }
}
