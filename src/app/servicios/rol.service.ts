import { Rol } from './../modelos/rol';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  API_ROLES,
  API_ROLES_ELIMINAR,
  API_ROLES_CREAR,
} from '../utilidades/dominios/uris';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  public apiRol: string = API_ROLES;
  public apiRolEliminar: string = API_ROLES_ELIMINAR;
  public apiRolCrear: string = API_ROLES_CREAR;

  constructor(private http: HttpClient) {}

  public cargarRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.apiRol);
  }

  public eliminarRol(rolID: number): Observable<Rol> {
    return this.http.delete<Rol>(this.apiRolEliminar + '/' + rolID);
  }

  public crearRol(objRol: Rol): Observable<Rol> {
    return this.http.post<Rol>(this.apiRolCrear, objRol);
  }
}
