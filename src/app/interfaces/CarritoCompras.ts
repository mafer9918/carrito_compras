export interface CarritoCompras{
    id_cliente:number|null;
    cliente?:string|null;
    subtotal:number;
    iva:number;
    total:number;
    estado: string;
    items: CarritoItem[];
}

export interface CarritoItem{
    id_producto:number;
    cantidad:number;
    iva: number;
    subtotal:number;
    total:number;
    producto?:string;
    imagen?:string;
}