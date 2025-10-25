import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

import { Producto } from '../../interfaces/producto.interface';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzInputNumberModule,
    NzSelectModule,
    NzTableModule,
    NzPaginationModule,
  ],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  filtroNombre = '';
  filtroSKU = '';
  filtroPrecio: number | null = null;
  filtroStock: number | null = null;
  pageSize = 50;
  pageIndex = 1;

  productoService = inject(ProductoService);

  ngOnInit(): void {
    this.productoService.obtenerProductos().subscribe((productos) => {
      this.productos = productos;
      this.productosFiltrados = productos;
    });
  }

filtrar(): void {
  this.productosFiltrados = this.productos.filter((p) => {
    const coincideNombre =
      !this.filtroNombre ||
      p.producto.toLowerCase().includes(this.filtroNombre.toLowerCase());

    const coincideSKU =
      !this.filtroSKU ||
      p.sku.toLowerCase().includes(this.filtroSKU.toLowerCase());

    // 🔹 Precio: menor o igual
    const coincidePrecio =
      this.filtroPrecio === null || this.filtroPrecio === undefined
        ? true
        : p.precio === this.filtroPrecio;

    // 🔹 Stock: exactamente igual
    const coincideStock =
      this.filtroStock === null || this.filtroStock === undefined
        ? true
        : p.stock === this.filtroStock;

    return coincideNombre && coincideSKU && coincidePrecio && coincideStock;
  });

 
  this.pageIndex = 1;
}

  resetear(): void {
    this.filtroNombre = '';
    this.filtroSKU = '';
    this.filtroPrecio = null;
    this.filtroStock = null;
    this.productosFiltrados = [...this.productos];
    this.pageIndex = 1;
  }

  get productosPaginados(): Producto[] {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.productosFiltrados.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.pageIndex = page;
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.pageIndex = 1;
  }
}
