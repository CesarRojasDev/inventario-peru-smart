import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const isLogged = localStorage.getItem('isLogged') === 'true';

    if (isLogged) {
      // Si está logueado, permite acceso a rutas protegidas
      return true;
    }

    // Si NO está logueado, redirige al login
    return this.router.createUrlTree(['/auth/login']);
  }
}