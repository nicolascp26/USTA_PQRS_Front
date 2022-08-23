import { HttpClient } from '@angular/common/http';
import { API_IMAGEN } from './../utilidades/dominios/uris';
import { Injectable } from '@angular/core';
import { Imagen } from '../modelos/imagen';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImagenService {
  public apiImagen = API_IMAGEN;

  constructor(private http: HttpClient) {}

  public agregarImagenPerfil(objImagen: Imagen): Observable<Imagen> {
    return this.http.post<Imagen>(
      this.apiImagen + '/addProfileImage',
      objImagen
    );
  }
}
