import { Rol } from '../../../../../modelos/rol';
import { Subscription } from 'rxjs';
import { Imagen } from '../../../../../modelos/imagen';
import { Usuario } from '../../../../../modelos/usuario';
import { Component, OnInit } from '@angular/core';
//import * as internal from 'stream';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  public objUsuario: Usuario;
  public objImagen: Imagen;

  public suscripcion: Subscription;
  public tmp: any;
  public cargaFinalizada: boolean;

  public patronCorreo = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  constructor() {
    this.objUsuario = this.inicializarUsuario();
    this.objImagen = this.inicializarImagen();
    this.suscripcion = this.tmp;
    this.cargaFinalizada = false;
  }

  ngOnInit(): void {}

  /**
   * METODOS OBLIGATORIOS
   */

  public inicializarUsuario(): Usuario {
    return new Usuario(0, '', '', '', '', this.inicializarRol());
  }

  public inicializarImagen(): Imagen {
    return new Imagen(0, this.inicializarUsuario(), '', '', '', '');
  }

  public inicializarRol(): Rol {
    return new Rol(0, '', 0);
  }

  /**Logica del negocio */

  public obtenerUsuario(): void {}

  /*Metodo para cargar la foto
  public seleccionarFoto(objeto: any): void {
    let caja = objeto.target.files[0];
    if (!caja || caja.length == 0) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(caja);
    reader.onload = () => {
      this.tmpBase64 = reader.result;
      this.foto = this.tmpBase64;
    };
  }*/
}
