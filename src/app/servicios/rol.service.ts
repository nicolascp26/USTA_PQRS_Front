import { Rol } from './../modelos/rol';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROLES } from '../utilidades/dominios/uris';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  public apiRol: string = API_ROLES;

  constructor(private http: HttpClient) {}

  public cargarRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.apiRol + '/getAll');
  }

  public crearRol(objRol: Rol): Observable<Rol> {
    return this.http.post<Rol>(this.apiRol + '/create', objRol);
  }

  public actualizarRol(objRol: Rol): Observable<Rol> {
    return this.http.put<Rol>(this.apiRol + '/update/' + objRol.rolId, objRol);
  }

  public eliminarRol(rolID: number): Observable<Rol> {
    return this.http.delete<Rol>(this.apiRol + '/delete/' + rolID);
  }
}
