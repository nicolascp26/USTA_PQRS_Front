import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwtDecode from 'jwt-decode';

import { AccesoRespuesta } from '../modelos/acceso-respuesta';
import { Acceso } from '../modelos/acceso';
import * as uris from '../utilidades/dominios/uris';

@Injectable({
  providedIn: 'root',
})
export class AccesoService {
  public objAcceso: Acceso;
  public appLogin: string;

  constructor(private http: HttpClient, private router: Router) {
    this.objAcceso = this.inicializarAcceso();
    this.appLogin = uris.API_ACCESO;
  }

  //******* Obligatorios: LOS QUE INICIALIZAN LOS MODELOS*/

  public inicializarAcceso(): Acceso {
    return new Acceso('', '');
  }

  public obtenerAcceso(): Acceso {
    return this.objAcceso;
  }
  //******* Logica del negocio */

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('foto');
    this.router.navigate(['/landing/acceso']);
  }

  public obtenerToken(): any {
    return localStorage.getItem('token') as string;
  }

  public verificarAcceso(): boolean {
    if (localStorage.getItem('token')) {
      const miToken: any = localStorage.getItem('token');
      try {
        const obj: any = jwtDecode(miToken);
        this.objAcceso.correoUsuario = obj.correo;
        this.objAcceso.claveUsuario = obj.clave;
        return true;
      } catch (error) {
        return false;
      }
    }
    return false;
  }

  public iniciarSesion(objAcceso: Acceso): Observable<AccesoRespuesta> {
    return this.http.post<AccesoRespuesta>(this.appLogin, objAcceso);
  }
}
