import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(private destino:Location) { }

  ngOnInit(): void {
  }

  public regresar(): void {
    this.destino.back();
  }
}
