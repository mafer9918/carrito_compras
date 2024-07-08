import { Component, inject, ViewChild } from '@angular/core';
import { IonicModule, IonModal, NavController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './servicios/Login.service';
import { ClienteService } from './servicios/Cliente.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
})
export class AppComponent {
  private loginService: LoginService = inject(LoginService);
  private clienteService: ClienteService = inject(ClienteService);
  private nvController: NavController = inject(NavController);
  abrirModalSesion: boolean = false;
  sesionIniciada: boolean = true;

  constructor() {
    this.sesionIniciada = this.loginService.estaIniciaSesion();
    this.loginService.loggedIn().subscribe((resp) => {
      if (!resp) {
        this.abrirModalSesion = true;
        this.sesionIniciada = false;
      } else {
        this.abrirModalSesion = false;
        this.sesionIniciada = true;
      }
    });
  }

  @ViewChild(IonModal) modal: IonModal | undefined;
  message = '';
  email: string = '';
  password: string = '';

  cancel() {
    this.modal?.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal?.dismiss(null, 'confirm');
  }

  registrate() {
    this.abrirModalSesion = false;
    this.nvController.navigateForward('/cliente');
  }

  onWillDismiss(event: Event) {
    /*const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role == 'confirm') {
      this.message = `Hello, ${ev.detail.data}`;
    }*/
    this.cancel();
  }

  iniciarSesion() {
    this.clienteService
      .getCliente(this.email)
      .subscribe((data) => {
        if (data.data) {
          if (this.password == data.data.password) {
            this.loginService.abrirSesion(data.data);
            this.password = '';
            this.email = '';
          } else {
            console.log('Contraseña invalida');
          }
        }
      });
  }

  abrirModalIniciarSesion(){
    this.abrirModalSesion = true;
  }

  cerrarSesion(){
    this.loginService.cerrarSesion();
    this.sesionIniciada = false;
  }
}
