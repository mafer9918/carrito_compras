import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Respuesta } from '../interfaces/Respuesta';
import { Producto } from '../interfaces/Producto';
import { CarritoCompras } from '../interfaces/CarritoCompras';

@Injectable({
  providedIn: 'root',
})
export class CarritoComprasService {
  private httpClient: HttpClient = inject(HttpClient);
  urlBase = 'https://epico.gob.ec/vehiculo/public/api/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  todosProductos() {
    return this.httpClient.get<RespuestaProductos>(
      this.urlBase + 'producto/all/'
    );
  }

  getProducto(id: number) {
    return this.httpClient.get<RespuestaProducto>(
      this.urlBase + 'producto/' + id
    );
  }

  crearCarrito(carrito: CarritoCompras) {
    return this.httpClient.post<RespuestaProductoNuevo>(
      this.urlBase + 'carrito/',
      carrito,
      this.httpOptions
    );
  }
}

export interface RespuestaProductos extends Respuesta {
  data: Producto[];
}

export interface RespuestaProducto extends Respuesta {
  data: Producto;
}

export interface RespuestaProductoNuevo extends Respuesta {
  data: number;
}
