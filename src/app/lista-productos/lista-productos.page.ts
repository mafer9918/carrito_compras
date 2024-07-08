import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarritoComprasService } from '../servicios/CarritoComprasService.service';
import { Producto } from '../interfaces/Producto';
import {
  IonContent,
  IonHeader,
  IonList,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonThumbnail,
  IonLabel,
  IonItem,
  IonButton,
  IonBadge,
  IonIcon
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { CarritoComprasTemporalService } from '../servicios/CarritoComprasTemporal.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.page.html',
  styleUrls: ['./lista-productos.page.scss'],
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
    IonButton,
    IonThumbnail,
    IonBadge,
    IonLabel,
    IonIcon
  ],
})
export class ListaProductosPage implements OnInit {
  private carritoComprasService: CarritoComprasService = inject(
    CarritoComprasService
  );
  private carritoComprasTemporal: CarritoComprasTemporalService = inject(
    CarritoComprasTemporalService
  );
  listaProductos: Producto[] = [];
  ngOnInit(): void {
    this.consultarProductos();
  }

  consultarProductos() {
    this.carritoComprasService.todosProductos().subscribe((data) => {
      this.listaProductos = data.data;
    });
  }

  getNumeroItems() {
    return this.carritoComprasTemporal.getTotalItems();
  }
}
