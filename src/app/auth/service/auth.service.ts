import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

interface Usuario {
  usuario: string;
  clave: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private url = 'https://www.peru-smart.com/datasource_generic/inventario_calidda/usuarios_calidda.txt';

  constructor(private http: HttpClient, private router: Router) {}

  login(usuarioInput: string, claveInput: string): Observable<boolean> {
  const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(this.url)}`;
    return new Observable(observer => {
      this.http.get(proxyUrl, { responseType: 'text' }).subscribe({
        next: (base64Text) => {
          try {
            const decoded = atob(base64Text);       // decodifica Base64
            const usuarios: Usuario[] = JSON.parse(decoded); // parsea JSON

            // Buscar usuario que coincida
            const user = usuarios.find(u => u.usuario === usuarioInput && u.clave === claveInput);

            if (user) {
              // Login exitoso
              localStorage.setItem('isLogged', 'true');
              localStorage.setItem('usuarioData', JSON.stringify(user));
              observer.next(true);
            } else {
              // Login fallido
              observer.next(false);
            }

            observer.complete();
          } catch (err) {
            observer.error('Error al procesar los datos: ' + err);
          }
        },
        error: (err) => observer.error('No se pudo cargar el archivo: ' + err.message)
      });
    });
  }

  checkStatus(): boolean {
    return !!localStorage.getItem('isLogged');
  }

  logout() {
    localStorage.removeItem('isLogged');
    localStorage.removeItem('usuarioData');
    this.router.navigateByUrl('/login');
  }
}
