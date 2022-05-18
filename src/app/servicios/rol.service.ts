import { Rol } from './../modelos/rol';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROLES, API_ROLES_ELIMINAR } from '../utilidades/dominios/uris';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  public apiRol: string = API_ROLES;
  public apiRolEliminar: string = API_ROLES_ELIMINAR;

  constructor(private http: HttpClient) {}

  public cargarRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.apiRol);
  }

  public eliminarRol(rolID: number): Observable<Rol> {
    return this.http.delete<Rol>(this.apiRolEliminar + '/' + rolID);
  }
}
