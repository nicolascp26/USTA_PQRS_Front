import { API_PREGUNTAS } from './../utilidades/dominios/uris';
import { Observable } from 'rxjs';
import { Pregunta } from './../modelos/pregunta';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PreguntasFrecuentesService {
  public apiPregunta: string = API_PREGUNTAS;

  constructor(private http: HttpClient) {}

  public cargarPreguntas(): Observable<Pregunta[]> {
    return this.http.get<Pregunta[]>(this.apiPregunta + '/getAll');
  }

  public obtenerPreguntaUnica(preguntaId: number): Observable<Pregunta> {
    return this.http.get<Pregunta>(
      this.apiPregunta + '/getSingle/' + preguntaId
    );
  }

  public crearPregunta(objPregunta: Pregunta): Observable<Pregunta> {
    return this.http.post<Pregunta>(this.apiPregunta + '/create', objPregunta);
  }

  public actualizarPregunta(objPregunta: Pregunta): Observable<Pregunta> {
    return this.http.put<Pregunta>(
      this.apiPregunta + '/update/' + objPregunta.prefId,
      objPregunta
    );
  }

  public eliminarPregunta(preguntaId: number): Observable<Pregunta> {
    console.log(preguntaId);
    return this.http.delete<Pregunta>(
      this.apiPregunta + '/delete/' + preguntaId
    );
  }
}
