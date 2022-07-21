import { Tipo } from './../modelos/tipo';
import { API_TIPOS } from './../utilidades/dominios/uris';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TipoService {
  public apiTipo: string = API_TIPOS;

  constructor(private http: HttpClient) {}

  public cargarTipos(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(this.apiTipo + '/getAll');
  }

  public crearTipo(objTipo: Tipo): Observable<Tipo> {
    return this.http.post<Tipo>(this.apiTipo + '/create', objTipo);
  }

  public actualizarTipo(objTipo: Tipo): Observable<Tipo> {
    return this.http.put<Tipo>(
      this.apiTipo + '/update/' + objTipo.tipoId,
      objTipo
    );
  }

  public eliminarTipo(tipoId: number): Observable<Tipo> {
    return this.http.delete<Tipo>(this.apiTipo + '/delete/' + tipoId);
  }
}
