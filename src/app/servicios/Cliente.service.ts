import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Cliente } from '../interfaces/Cliente';
import { Respuesta } from '../interfaces/Respuesta';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private httpClient: HttpClient = inject(HttpClient);
  urlBase = "https://epico.gob.ec/vehiculo/public/api/";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  crear(cliente: Cliente){
    return this.httpClient.post<Respuesta>(this.urlBase+'cliente/', cliente, this.httpOptions);
  }

  getCliente(email:string){
    let options = {...this.httpOptions, params: {'email': email}};
    return this.httpClient.get<Respuesta>(this.urlBase+'cliente/email/', options);
  }

}
