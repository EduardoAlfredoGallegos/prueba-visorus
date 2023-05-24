import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticuloModel } from 'src/app/models/articulo.model';
import { CategoriaModel } from 'src/app/models/categoria.model';
import { PrecioModel } from 'src/app/models/precio.model';
import { ArticuloServiceService } from 'src/app/services/articulo-service.service';
import { CategoriaServiceService } from 'src/app/services/categoria-service.service';
import { parse, stringify, toJSON, fromJSON } from 'flatted';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {

  articulo: ArticuloModel = {
    clave: '',
    nombre: '',
    categoria: {
      nombre: '',
      clave: '',
      fechaCreado: 0,
      activo: true
    },
    precios: [
      { precio: 0 }
    ],
    activo: true
  }
  categorias: CategoriaModel[];
  precios: PrecioModel[];
  articuloId: any;
  articuloForm: FormGroup;

  constructor(private route: ActivatedRoute, private aServicio: ArticuloServiceService,
    private _formBuilder: FormBuilder, private enrutador: Router,
    private cServicio: CategoriaServiceService) { }

  ngOnInit(): void {
    this.articuloId = this.route.snapshot.params['id'];
    this.crearArticuloForm();
    this.cServicio.getAllCategorias().subscribe(r => {
      this.categorias = r.data;
    });
    if (this.articuloId) {
      this.cargarArticulo(this.articuloId);
    }

  }

  get arrayPrecios() {
    return this.articuloForm.get('precios') as FormArray;
  }

  cargarArticulo(id: any) {
    this.aServicio.getArticulo(id).subscribe(res => {
      this.articulo = res;
      this.articulo.precios.forEach((precio, index) => {
        this.arrayPrecios.push(
          this._formBuilder.group({
            id: [precio.id],
            precio: ['', [Validators.required]],
          })
        );
      });
    })
  }

  crearArticuloForm() {
    this.articuloForm = this._formBuilder.group({
      clave: [this.articulo.clave, [Validators.required]],
      nombre: [this.articulo.nombre, [Validators.required]],
      categoria: [this.articulo.categoria.id, [Validators.required]],
      precios: this._formBuilder.array([]),
    });
  }
  agregarPrecio() {
    this.arrayPrecios.push(
      this._formBuilder.group({
        precio: ['', [Validators.required]],
      })
    );
  }

  eliminarPrecio(index: number, precio: { value: { id: any; }; }) {
    this.arrayPrecios.removeAt(index);
  }

  editarArticulo() {
    this.aServicio.getArticulo(this.articuloId).subscribe(res => {
      this.articulo = res;
      this.articulo.clave = this.articuloForm.value.clave;
      this.articulo.nombre = this.articuloForm.value.nombre;
      this.articulo.precios.forEach((precio, index) => {
        this.articulo.precios[index] = this.articuloForm.value.precios[index]
      });

      this.cServicio.getCategoria(this.articuloForm.value.categoria).subscribe(r => {
        var categoria = res;
        this.articulo.categoria = categoria;
        this.articulo.categoria.categoria = null
        this.aServicio.updateArticulo(this.articulo);
        this.cargarArticulo(this.articuloId);
      });

    });
  }

  eliminarArticulo() {
    this.aServicio.deleteArticulo(this.articuloId);
    this.enrutador.navigate(['/articulos'])
  }

  guardarArticulo() {
    console.log(this.articulo);
    this.articulo.clave = this.articuloForm.get('clave')?.value;
    this.articulo.nombre = this.articuloForm.get('nombre')?.value;
    this.articulo.activo = true;
    for (let index = 0; index < this.articuloForm.value.precios.length; index++) {
      this.articulo.precios[index] = this.articuloForm.value.precios[index];
    }
    this.cServicio.getCategoria(this.articuloForm.value.categoria).subscribe(res=>{
      this.articulo.categoria = res;
      this.aServicio.postArticulo(this.articulo)
    })
  }

}