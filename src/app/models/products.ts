export interface Products {
    idarticulo?: number;
    idcategoria: number;
    codigo: string;
    nombrecategoria: string;
    nombre: string;
    stock: number;
    descripcion: string; 
    imagen: string;
    condicion: string;
    precio_costo: number;
    precio_venta: number;
    profit: number;
    others: number;
    idwarehouse: number;
    created_at: Date;
}
