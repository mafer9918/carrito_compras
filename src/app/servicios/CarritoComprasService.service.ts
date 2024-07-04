import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Respueta } from '../interfaces/Respuesta';
import { Producto } from '../interfaces/Producto';

@Injectable({
  providedIn: 'root',
})
export class CarritoComprasService {
  private httpClient: HttpClient = inject(HttpClient);
  urlBase = "https://epico.gob.ec/vehiculo/public/api/";

  todosProductos(){
    return this.httpClient.get<RespuestaProductos>(this.urlBase+'product/all/');
  }
}

export interface RespuestaProductos extends Respueta{
  data: Producto[];
}