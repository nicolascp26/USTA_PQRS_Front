import { AccesoRespuesta } from './../modelos/acceso-respuesta';
import { Acceso } from './../modelos/acceso';
import { Usuario } from './../modelos/usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_USUARIO } from './../utilidades/dominios/uris';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public appUser = API_USUARIO;

  constructor(private http: HttpClient) {}

  public obtenerUsuarioUnico(usuarioId: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.appUser + '/getSingle/' + usuarioId);
  }

  public cargarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.appUser + '/getAll');
  }

  public obtenerDocentes(usuarioId: number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.appUser + '/getTeachers/'+usuarioId);
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

  public actualizarUsuario(objUsuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(
      this.appUser + '/update/' + objUsuario.usuarioId,
      objUsuario
    );
  }

  public actualizarUsuarioAcceso(objAcceso: Acceso,objUsuario: Usuario): Observable<Acceso> {
    return this.http.put<Acceso>(this.appUser + '/registro' + objUsuario.usuarioId, objAcceso);
  }

  public eliminarUsuario(usuarioId: number): Observable<Usuario> {
    return this.http.delete<Usuario>(this.appUser + '/delete/' + usuarioId);
  }

  public estadisticasAdmin(): Observable<any>{
    return this.http.get<any[]>(this.appUser + '/getStats');
  }

  public estadisticasUsuario(usuarioId: number): Observable<any>{
    return this.http.get<any[]>(this.appUser + '/getStats/' + usuarioId);
  }

  public estadisticasDocente(usuarioId: number): Observable<any>{
    return this.http.get<any[]>(this.appUser + '/getStatsTeacher/' + usuarioId);
  }
}
