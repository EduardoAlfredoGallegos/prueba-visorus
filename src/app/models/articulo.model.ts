import { CategoriaModel } from "./categoria.model";
import { PrecioModel } from "./precio.model";

export class ArticuloModel {
    id?: string;
    clave:string;
    categoria: CategoriaModel;
    nombre: string;
    precios: PrecioModel[];
    activo: boolean;

    constructor(item?:any){
        item=item||{};
        if (item.id) {
            this.id = item.id;
        }
        this.clave = item.clave || '';
        this.nombre = item.nombre || '';
        this.categoria = item.categoria || '';
        this.precios = item.precios || [];
        this.activo=item.activo || true;
    }
}