import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaServiceService } from 'src/app/services/categoria-service.service';
import { FormBuilder, Validators } from '@angular/forms'
import { CategoriaModel } from 'src/app/models/categoria.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categoria: CategoriaModel = {
    clave: '',
    nombre: '',
    fechaCreado: 0,
    activo: true
  }
  categoriaId: any;
  categoriaForm: FormGroup;

  constructor(private route: ActivatedRoute, private cServicio: CategoriaServiceService,
    private _formBuilder: FormBuilder, private enrutador: Router) { }

  ngOnInit(): void {
    this.categoriaId = this.route.snapshot.params['id'];
    this.crearCategoriaForm();
    if (this.categoriaId) {
      this.cargarCategoria(this.categoriaId);
    }
  }

  cargarCategoria(id: any) {
    this.cServicio.getCategoria(id).subscribe({
      next: (response) => {
        if (response.activo) {
          this.categoria = response;
        } else {
          Swal.fire({
            title: 'La categoría a la que intenta acceder ha sido eliminada',
            icon: 'error',
            confirmButtonText: 'Entendido'
          });
          this.enrutador.navigate(['/categorias'])
        }
      },
      error: (err) => {
        if (err.status == 500) {
          Swal.fire({
            title: 'La categoría a la que intenta acceder no existe',
            icon: 'error',
            confirmButtonText: 'Entendido'
          })
          this.enrutador.navigate(['/categorias'])
        } else {
          Swal.fire({
            title: 'No se han podido obtener la información de la categoria',
            text: 'Intente más tarde',
            icon: 'error',
            confirmButtonText: 'Entendido'
          })
        }
      }
    });
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
      this.cServicio.updateCategoria(this.categoria);
    });
    this.cargarCategoria(this.categoriaId);
  }

  eliminarCategoria() {
    this.cServicio.deleteCategoria(this.categoriaId);
    this.enrutador.navigate(['/categorias'])
  }

  guardarCategoria() {
    this.categoria.clave = this.categoriaForm.get('clave')?.value;
    this.categoria.nombre = this.categoriaForm.get('nombre')?.value;
    this.categoria.fechaCreado = new Date().getMilliseconds();
    this.categoria.activo = true;
    this.cServicio.postCategoria(this.categoria);
  }

}
