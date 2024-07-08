import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarritoComprasService } from '../servicios/CarritoComprasService.service';
import { Producto } from '../interfaces/Producto';
import { CarritoComprasTemporalService } from '../servicios/CarritoComprasTemporal.service';
import { CarritoItem } from '../interfaces/CarritoCompras';
import {
  IonContent,
  IonHeader,
  IonList,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonLabel,
  IonItem,
  IonInput,
  IonAlert,
  IonFooter,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonIcon,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.page.html',
  styleUrls: ['./detalle-producto.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
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
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonLabel,
    IonInput
  ],
})
export class DetalleProductoPage {
  private carritoComprasService: CarritoComprasService = inject(
    CarritoComprasService
  );
  private activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private carritoComprasTemporalService: CarritoComprasTemporalService = inject(
    CarritoComprasTemporalService
  );
  private navCtrl: NavController = inject(NavController);
  producto: Producto | undefined;
  cantidad: number = 1;
  subtotal: number = 0;
  iva: number = 0;
  total: number = 0;

  constructor() {
    this.consultarProducto();
  }

  consultarProducto() {
    this.activeRoute.params.subscribe((params) => {
      this.carritoComprasService
        .getProducto(params['id_producto'])
        .subscribe((data) => {
          this.producto = data.data;
          this.verificarItemCarrito();
        });
    });
  }

  verificarItemCarrito() {
    if (!this.producto) {
      return;
    }
    const item = this.carritoComprasTemporalService.getItemProduct(
      this.producto?.id
    );
    if (!item) {
      this.cantidad = 1;
    } else {
      this.cantidad = item?.cantidad;
    }
    this.calcular();
  }

  sumar() {
    this.cantidad++;
    this.calcular();
  }

  restar() {
    if (this.cantidad - 1 == 0) {
      return;
    }
    this.cantidad--;
    this.calcular();
  }

  agregarCarrito() {
    if (!this.producto) {
      return;
    }
    this.calcular();
    let item: CarritoItem = {
      cantidad: this.cantidad,
      id_producto: this.producto.id,
      iva: this.iva,
      subtotal: this.subtotal,
      total: this.total,
      producto: this.producto.nombre,
      imagen: this.producto.imagen,
    };
    this.carritoComprasTemporalService.agregarProducto(item);
    this.retroceder();
  }

  calcular() {
    if (!this.producto) {
      return;
    }
    this.subtotal = this.cantidad * this.producto?.price;
    this.iva = this.subtotal * 0.15;
    this.total = this.iva + this.subtotal;
  }

  retroceder() {
    this.navCtrl.back();
  }
}
