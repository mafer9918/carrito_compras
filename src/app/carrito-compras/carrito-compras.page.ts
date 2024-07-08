import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CarritoComprasTemporalService } from '../servicios/CarritoComprasTemporal.service';
import { CarritoCompras } from '../interfaces/CarritoCompras';
import { LoginService } from '../servicios/Login.service';
import { RouterLink } from '@angular/router';
import { CarritoComprasService } from '../servicios/CarritoComprasService.service';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.page.html',
  styleUrls: ['./carrito-compras.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class CarritoComprasPage {
  private carritoComprasService: CarritoComprasService = inject(
    CarritoComprasService
  );
  private carritoComprasTemporalService: CarritoComprasTemporalService = inject(
    CarritoComprasTemporalService
  );
  private loginService: LoginService = inject(LoginService);
  public carrito: CarritoCompras;
  alertButtons = [
    {
      text: 'Aceptar',
      role: 'confirm',
      handler: () => {
        this.carritoComprasTemporalService.clear();
        this.carrito = this.carritoComprasTemporalService.carrito;
      },
    },
  ];
  isAlertOpen = false;

  constructor() {
    this.carrito = this.carritoComprasTemporalService.carrito;
  }

  grabar() {
    if (!this.loginService.estaIniciaSesion()) {
      this.loginService.abrirModal();
      return;
    }

    const usuario = this.loginService.getUsuario();
    this.carrito.id_cliente = usuario.id;
    this.carritoComprasService.crearCarrito(this.carrito).subscribe((data) => {
      if (data.codigo == '1') {
        this.setOpen(true);
        this.carritoComprasTemporalService.clear();
      }
    });
  }

  getDeshabilitarBtnGrabar(): boolean {
    return this.carrito?.items.length == 0;
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
}
