import { AccesoService } from './servicios/acceso.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private accesoService: AccesoService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let token = this.accesoService.obtenerToken();
    let authReq = request;
    authReq = this.addTokenHeader(request, token);
    return next.handle(authReq).pipe(
      catchError((miError) => {
        if (miError.status === 401) {
          alert('La sesion ha expirado, vuelva a iniciar sesion');
          this.accesoService.logout();
        }
        throw miError;
      })
    );
  }

  addTokenHeader(request: HttpRequest<any>, token: any) {
    return request.clone({
      setHeaders: { Authorization: 'bearer ' + token },
    });
  }
}
