import { HttpClient } from '@angular/common/http';
import { API_ANEXOS } from './../utilidades/dominios/uris';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnexosService {
  public apiAnexos = API_ANEXOS;

  constructor(private http: HttpClient) {}

  public subirAnexo(anexo: FormData): Observable<any> {
    return this.http.post<any>(this.apiAnexos + '/uploadFile', anexo);
  }
}
