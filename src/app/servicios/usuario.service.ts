import { AccesoRespuesta } from './../modelos/acceso-respuesta';
import { Acceso } from './../modelos/acceso';
import { Usuario } from './../modelos/usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as uris from '../utilidades/dominios/uris';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public appUser = uris.API_USUARIO;

  constructor(private http: HttpClient) {}

  public obtenerUsuarioServicio(idUsuario: any): Observable<Usuario> {
    return this.http.get<Usuario>(this.appUser + '/' + idUsuario);
  }
  public actualizarUsuarioServicio(objUsuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(
      this.appUser + '/estudiante/perfil' + objUsuario.usuarioID,
      objUsuario
    );
  }
  public registrarUsuario(
    objUsuario: Usuario,
    objAcceso: Acceso
  ): Observable<AccesoRespuesta> {
    return this.http.post<AccesoRespuesta>(this.appUser + '/registro', [
      objUsuario,
      objAcceso,
    ]);
  }
}
