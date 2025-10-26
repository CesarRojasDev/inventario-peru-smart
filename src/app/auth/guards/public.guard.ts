import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const isLogged = localStorage.getItem('isLogged') === 'true';

    if (isLogged) {
      // Si ya está logueado, redirige a productos
      return this.router.createUrlTree(['/productos/listar']);
    }

    // Si NO está logueado, puede ver el login
    return true;
  }
}