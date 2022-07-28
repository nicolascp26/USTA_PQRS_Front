import { AccesoService } from './../../../../../servicios/acceso.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  public nombreUsuario: string | any;

  constructor(public accesoService: AccesoService) {
    this.nombreUsuario = accesoService.objAcceso.usuarioNombres;
  }

  ngOnInit(): void {}
}
