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
}
