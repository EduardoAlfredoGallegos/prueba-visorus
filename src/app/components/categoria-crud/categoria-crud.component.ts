import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { CategoriaModel } from 'src/app/models/categoria.model';
import { CategoriaServiceService } from 'src/app/services/categoria-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria-crud',
  templateUrl: './categoria-crud.component.html',
  styleUrls: ['./categoria-crud.component.css']
})
export class CategoriaCrudComponent implements OnInit {

  categorias: CategoriaModel[];

  constructor(private categoriasService: CategoriaServiceService) { }

  ngOnInit(): void {
    this.categoriasService.getAllCategorias().subscribe({
      next: (response) => {
        this.categorias = response.data;
      },
      error: (err) => {
        Swal.fire({
          title: 'No se han podido obtener las categorias',
          text: 'Intente más tarde',
          icon: 'error',
          confirmButtonText: 'Entendido'
        })
      }
    });
  }

}
