import { Injectable } from '@angular/core';
import { CarritoCompras, CarritoItem } from '../interfaces/CarritoCompras';

@Injectable({
  providedIn: 'root',
})
export class CarritoComprasTemporalService {
  carrito: CarritoCompras = {
    id_cliente: null,
    iva: 0,
    subtotal: 0,
    total: 0,
    estado: 'A',
    items: [],
  };

  constructor() {}

  agregarProducto(item: CarritoItem) {
    let itemSelected = this.carrito.items.find(
      (elemento) => elemento.id_producto == item.id_producto
    );
    if (!itemSelected) {
      this.carrito.items.push(item);
    } else {
      itemSelected.cantidad = item.cantidad;
      itemSelected.subtotal = item.subtotal;
      itemSelected.iva = item.iva;
      itemSelected.total = item.total;
    }
    this.calcular();
  }

  getItemProduct(id_producto: number) {
    const item = this.carrito.items.find(
      (item) => item.id_producto == id_producto
    );
    return item;
  }

  calcular() {
    this.carrito.iva = 0;
    this.carrito.total = 0;
    this.carrito.subtotal = 0;
    this.carrito.items.forEach((item) => {
      this.carrito.subtotal += item.subtotal;
      this.carrito.iva += item.iva;
      this.carrito.total += item.total;
    });
  }

  getTotalItems() {
    return this.carrito.items.length;
  }

  clear() {
    this.carrito = {
      id_cliente: null,
      iva: 0,
      subtotal: 0,
      total: 0,
      estado: 'A',
      items: [],
    };
  }
}
