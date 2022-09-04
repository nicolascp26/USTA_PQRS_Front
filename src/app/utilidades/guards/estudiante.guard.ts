import { AccesoService } from './../../servicios/acceso.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EstudianteGuard implements CanActivateChild {
  constructor(private accesoService: AccesoService,
    private location: Location){}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.accesoService.accederRutasEstudiante() || this.accesoService.accederRutasInvitado()) {
        return true;
      } else {
        this.location.back();
        return false;
      }
  }

}
