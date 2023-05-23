export class CategoriaModel {
    id?:string;
    clave: string;
    fechaCreado: number;
    nombre: string;
    activo: boolean;

    constructor(item?:any){
        item=item||{};
        if (item.id) {
            this.id = item.id;
        }
        this.clave = item.clave || '';
        this.fechaCreado = item.fechaCreado || 0;
        this.nombre = item.nombre || '';
        this.activo=item.activo || true;
    }
}