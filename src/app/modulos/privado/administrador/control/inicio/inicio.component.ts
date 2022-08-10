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
    //Inicializar consumo de servicios
    this.miSuscripcion = this.tmp;
    this.cargaFinalizada = false;
  }

  ngOnInit(): void {
    this.obtenerEstadisticas();
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
}
