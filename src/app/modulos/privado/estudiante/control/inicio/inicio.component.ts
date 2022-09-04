import { observadorAny } from './../../../../../utilidades/observable/observable-any';
import { UsuarioService } from './../../../../../servicios/usuario.service';
import { AccesoService } from './../../../../../servicios/acceso.service';
import { Component, OnInit } from '@angular/core';
import { map, Subscription, finalize } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  public nombreUsuario: string | any;
  public usuarioId: number;
  public rolUsuario:string|any;
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
    this.usuarioId = accesoService.objAcceso.usuarioId;
    this.rolUsuario = accesoService.objAcceso.usuarioRol;
    //Inicializar consumo de servicios
    this.miSuscripcion = this.tmp;
    this.cargaFinalizada = false;
  }
  ngOnInit(): void {
    this.obtenerEstadisticas(this.usuarioId);
  }

  //Lógica del negocio
  public obtenerEstadisticas(usuarioId: number): void {
    this.miSuscripcion = this.usuarioService
      .estadisticasUsuario(usuarioId)
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
