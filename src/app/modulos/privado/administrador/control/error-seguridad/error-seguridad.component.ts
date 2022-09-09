import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-seguridad',
  templateUrl: './error-seguridad.component.html',
  styleUrls: ['./error-seguridad.component.css'],
})
export class ErrorSeguridadComponent implements OnInit {
  constructor(private destino: Location) {}

  ngOnInit(): void {}
  public regresar(): void {
    this.destino.back();
  }
}
