import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Cliente } from '../interfaces/Cliente';
import { ClienteService } from '../servicios/Cliente.service';
import { LoginService } from '../servicios/Login.service';
import {
  IonContent,
  IonHeader,
  IonList,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonItem,
  IonAlert,
  IonFooter,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonAlert,
    IonFooter,
    IonButton
  ],
})
export class ClientePage {
  protected formBuilder: FormBuilder = inject(FormBuilder);
  private clienteService: ClienteService = inject(ClienteService);
  private loginService: LoginService = inject(LoginService);
  private navCtrl: NavController = inject(NavController);
  alertButtons = ['Aceptar'];
  isAlertOpen = false;

  formDatos = this.formBuilder.group({
    nombre: [null, [Validators.required]],
    apellido: [null, [Validators.required]],
    password: [null, [Validators.required]],
    email: [null, [Validators.required]],
    telefono: [null],
  });

  grabar() {
    if (!this.formDatos.valid) {
      return;
    }
    let cliente: Cliente = { ...this.formDatos.value };
    this.clienteService.crear(cliente).subscribe((data) => {
      if (data.codigo == '1') {
        cliente.id = data.data.id;
        this.loginService.abrirSesion(cliente);
        this.setOpen(true);
        this.navCtrl.back();
      }
    });
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
}
