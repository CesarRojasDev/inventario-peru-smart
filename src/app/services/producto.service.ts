import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/producto.interface';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private http = inject(HttpClient);
  private url = '/api/datasource_generic/inventario_calidda/productos_calidda.json';


  constructor() { }
  
  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url);
  }
}
