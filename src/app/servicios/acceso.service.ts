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

  //******* Logica del negocio */

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('foto');
    this.router.navigate(['/landing/acceso']);
  }

  public obtenerToken(): any {
    return localStorage.getItem('token') as string;
  }

  public obtenerRolporToken(): any {
    return this.objAcceso.usuarioRol;
  }

  public verificarAcceso(): boolean {
    if (localStorage.getItem('token')) {
      const miToken: any = localStorage.getItem('token');

      try {
        const obj: any = jwtDecode(miToken);
        this.objAcceso.usuarioId = obj.id;
        this.objAcceso.correoUsuario = obj.correo;
        this.objAcceso.claveUsuario = '';
        this.objAcceso.usuarioRol = obj.usuarioRol;
        this.objAcceso.usuarioNombres = obj.usuarioNombres;
        return true;
      } catch (error) {
        return false;
      }
    }
    return false;
  }

  public iniciarSesion(objAcceso: Acceso): Observable<AccesoRespuesta> {
    return this.http.post<AccesoRespuesta>(this.appLogin + '/login', objAcceso);
  }

  public accederRutasAdmin(): boolean {
    if (this.objAcceso.usuarioRol == 'Administrador') {
      return true;
    } else return false;
  }

  public accederRutasEstudiante(): boolean {
    if (this.objAcceso.usuarioRol == 'Estudiante') {
      return true;
    } else return false;
  }

  public actualizarClave(
    objAcceso: Acceso,
    usuarioId: number,
    nuevaClave: string
  ): Observable<Acceso> {
    return this.http.put<Acceso>(
      this.appLogin + '/updatePassword/' + usuarioId,
      [objAcceso, nuevaClave]
    );
  }
}
