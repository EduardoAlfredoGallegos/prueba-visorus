import { Component, OnInit } from '@angular/core';
import { ArticuloModel } from 'src/app/models/articulo.model';
import { ArticuloServiceService } from 'src/app/services/articulo-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-articulo-crud',
  templateUrl: './articulo-crud.component.html',
  styleUrls: ['./articulo-crud.component.css']
})
export class ArticuloCrudComponent implements OnInit {

  articulos: ArticuloModel[];
  constructor(private articuloService: ArticuloServiceService) { }

  ngOnInit(): void {
    this.articuloService.getAllArticulos().subscribe({
      next: (response) => {
        this.articulos = response.data;
      },
      error: (err) => {
        Swal.fire({
          title: 'No se han podido obtener los articulos',
          text: 'Intente más tarde',
          icon: 'error',
          confirmButtonText: 'Entendido'
        })
      }
    });
  }

}
