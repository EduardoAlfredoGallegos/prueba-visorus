export class PrecioModel {
    id?:string;
    precio: number;

    constructor(item?:any){
        item=item||{};
        if (item.id) {
            this.id = item.id;
        }
        this.precio = item.precio || '';
    }
}