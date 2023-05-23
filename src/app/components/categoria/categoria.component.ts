import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaServiceService } from 'src/app/services/categoria-service.service';
import { FormBuilder, Validators } from '@angular/forms'
import { Subject } from 'rxjs';
import { CategoriaModel } from 'src/app/models/categoria.model';
import { log } from 'console';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  pageType: any;
  categoria: CategoriaModel={
    clave:'',
    nombre:'',
    fechaCreado:0,
    activo:true
  }
  categoriaId: any;
  categoriaForm: FormGroup;
  progressSpinner: boolean;
  disabled = false;
  _unsubscribeAll: Subject<any>

  constructor(private route: ActivatedRoute, private cServicio: CategoriaServiceService,
    private _formBuilder: FormBuilder, private enrutador: Router) {}

  ngOnInit(): void {
    this.categoriaId = this.route.snapshot.params['id'];
    this.crearCategoriaForm();
    if (this.categoriaId) {
      this.cargarCategoria(this.categoriaId);
    }


    this.progressSpinner = false;
  }

  cargarCategoria(id: any) {
    this.cServicio.getCategoria(id).subscribe(res => {
      this.categoria = res;
      console.log(this.categoria);
    })
  }

  crearCategoriaForm() {
    this.categoriaForm = this._formBuilder.group({
      clave: [this.categoria.clave, [Validators.required]],
      nombre: [this.categoria.nombre, [Validators.required]]
    });
  }

  editarCategoria() {
    this.cServicio.getCategoria(this.categoriaId).subscribe(res => {
      this.categoria = res;
      this.categoria.clave = this.categoriaForm.value.clave;
      this.categoria.nombre = this.categoriaForm.value.nombre;
      console.log(this.categoriaForm);
      
      //this.cServicio.updateCategoria(this.categoria);
    })
  }

  eliminarCategoria(){
    this.cServicio.deleteCategoria(this.categoriaId);
    this.enrutador.navigate(['/categorias'])
  }

  guardarCategoria() {
    console.log(this.categoria);
    this.categoria.clave = this.categoriaForm.get('clave')?.value;
    this.categoria.nombre = this.categoriaForm.get('nombre')?.value;
    this.categoria.fechaCreado = new Date().getMilliseconds();
    this.categoria.activo = true;
    this.cServicio.postCategoria(this.categoria);
  }

}
