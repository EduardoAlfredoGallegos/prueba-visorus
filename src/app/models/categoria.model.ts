export class CategoriaModel {
    id?:string;
    clave: string;
    fachaCreado: number;
    nombre: string;
    activo: boolean;

    contructor(item?:any){
        item=item||{};
        if (item.id) {
            this.id = item.id;
        }
        this.clave = item.clave || '';
        this.fachaCreado = item.fachaCreado || '';
        this.nombre = item.nombre || '';
        this.activo=item.activo || true;
    }
}