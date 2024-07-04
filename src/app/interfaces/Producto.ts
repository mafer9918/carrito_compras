export interface Producto{
    id: number;
    nombre: string;
    id_categoria: number;
    estado: string;
    descripcion?: string;
    imagen?: string;
    price: number;
    categoria?:any;
}