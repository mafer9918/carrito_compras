import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Cliente } from '../interfaces/Cliente';
import { ClienteService } from './Cliente.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private logginInSubject = new Subject<boolean>();

  loggedIn(): Observable<boolean>{
    return this.logginInSubject.asObservable();
  }

  abrirModal(){
    this.logginInSubject.next(false);
  }

  abrirSesion(cliente: Cliente){
    const clienteString = JSON.stringify(cliente);
    sessionStorage.setItem('usuario', clienteString);
    this.logginInSubject.next(true);
  }

  cerrarSesion(){
    sessionStorage.clear();
    this.logginInSubject.next(false);
  }

  estaIniciaSesion(){
    let token = sessionStorage.getItem('usuario');
    if(token){
      return true;
    }else{
      return false;
    }
  }

  getUsuario(){
    let usuarioString = sessionStorage.getItem('usuario');
    if(!usuarioString){
      return null;
    }
    return JSON.parse(usuarioString);
  }

}
