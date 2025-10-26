import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Producto } from '../interfaces/producto.interface';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private http = inject(HttpClient);
  private url = 'https://peru-smart.com/datasource_generic/inventario_calidda/productos_calidda.json';


  constructor() { }
  
    obtenerProductos(): Observable<Producto[]> {

    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(this.url)}`;

    return this.http.get<Producto[]>(proxyUrl).pipe(
      catchError((error) => {
        console.error('Error al obtener los productos:', error);
        return throwError(() => new Error('Error al obtener productos'));
      })
    );
  }
}
