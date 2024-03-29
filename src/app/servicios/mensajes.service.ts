import { Mensaje } from './../modelos/mensaje';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_MENSAJES } from './../utilidades/dominios/uris';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MensajesService {
  public apiMensajes = API_MENSAJES;

  constructor(private http: HttpClient) {}

  public obtenerSolicitudesAdmin(): Observable<Mensaje[]> {
    return this.http.get<Mensaje[]>(this.apiMensajes + '/getAllAdmin');
  }

  public obtenerSolicitudesUsuario(usuarioId: number): Observable<Mensaje[]> {
    return this.http.get<Mensaje[]>(
      this.apiMensajes + '/getAllUser/' + usuarioId
    );
  }

  public obtenerSolicitudesDocente(
    usuarioAsignado: number
  ): Observable<Mensaje[]> {
    return this.http.get<Mensaje[]>(
      this.apiMensajes + '/getAllTeacher/' + usuarioAsignado
    );
  }

  public obtenerHiloMensajes(mensajeId: number): Observable<Mensaje[]> {
    return this.http.get<Mensaje[]>(
      this.apiMensajes + '/getMsgThread/' + mensajeId
    );
  }

  public registrarSolicitud(objMensaje: Mensaje): Observable<Mensaje> {
    return this.http.post<Mensaje>(
      this.apiMensajes + '/sendRequest',
      objMensaje
    );
  }

  public responderMensaje(objMensaje: Mensaje): Observable<Mensaje> {
    return this.http.post<Mensaje>(
      this.apiMensajes + '/replyMessage/' + objMensaje.mensajeCodpadre,
      objMensaje
    );
  }

  public terminarSolicitud(objMensaje: Mensaje): Observable<Mensaje> {
    return this.http.put<Mensaje>(
      this.apiMensajes + '/finalizeRequest/' + objMensaje.mensajeCodpadre,
      objMensaje
    );
  }

  public reabrirSolicitud(objMensaje: Mensaje): Observable<Mensaje> {
    return this.http.put<Mensaje>(
      this.apiMensajes + '/reopenRequest/' + objMensaje.mensajeCodpadre,
      objMensaje
    );
  }

  public reasignarSolicitud(
    mensajeId: number,
    usuarioId: number
  ): Observable<Mensaje> {
    return this.http.put<Mensaje>(this.apiMensajes + '/reassignRequest/', [
      mensajeId,
      usuarioId,
    ]);
  }
}
