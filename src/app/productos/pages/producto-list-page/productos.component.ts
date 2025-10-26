import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';

import * as XLSX from 'xlsx';

import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/producto.interface';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-productos-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzFormModule,
    NzGridModule,
    NzImageModule,
    NzInputModule,
    NzInputNumberModule,
    NzModalModule,
    NzPaginationModule,
    NzSelectModule,
    NzTableModule,
    NzIconModule,
  ],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosListComponent {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  filtroNombre = '';
  filtroSKU = '';
  filtroPrecio: number | null = null;
  filtroStock: number | null = null;
  pageSize = 50;
  pageIndex = 1;

  productoService = inject(ProductoService);
  isVisible = false;
  imagenes: string[] = [];
  
  ngOnInit(): void {
    this.buscarProducto();
  }

  buscarProducto(): void {
    this.productoService.obtenerProductos().subscribe((productos) => {
      this.productos = productos;
      this.productosFiltrados = productos;
      this.filtrar();
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

  showModal(producto: Producto): void {
    this.imagenes = [
      producto.imagen1,
      producto.imagen2,
      producto.imagen3,
    ].filter((img) => !!img);
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  exportarExcel() {
    // Mapear los datos para el Excel
    const datosExportar = this.productosFiltrados.map((p) => ({
      Nombre: p.producto,
      SKU: p.sku,
      'SKU CALIDDA': p.skuCalidda,
      Precio: p.precio,
      Stock: p.stock,
    }));

    // Crear el libro de trabajo
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosExportar);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Inventario');

    // Guardar el archivo
    const fecha = new Date().toISOString().split('T')[0];
    XLSX.writeFile(wb, `inventario_${fecha}.xlsx`);
  }
  exportarPaginaActual() {
    const datosExportar = this.productosPaginados.map((p) => ({
      Nombre: p.producto,
      SKU: p.sku,
      'SKU CALIDDA': p.skuCalidda,
      Precio: p.precio,
      Stock: p.stock,
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosExportar);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Inventario');

    const fecha = new Date().toISOString().split('T')[0];
    XLSX.writeFile(wb, `inventario_pagina_actual_${fecha}.xlsx`);
  }
}
