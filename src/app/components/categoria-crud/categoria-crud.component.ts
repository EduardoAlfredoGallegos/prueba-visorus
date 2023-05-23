import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { CategoriaModel } from 'src/app/models/categoria.model';
import { CategoriaServiceService } from 'src/app/services/categoria-service.service';

@Component({
  selector: 'app-categoria-crud',
  templateUrl: './categoria-crud.component.html',
  styleUrls: ['./categoria-crud.component.css']
})
export class CategoriaCrudComponent implements OnInit {

  categorias: CategoriaModel[];

  constructor(private categoriasService: CategoriaServiceService) { }

  ngOnInit(): void {
    this.categoriasService.getAllCategorias().subscribe(res => {
      this.categorias = res.data;
      console.log(this.categorias);
    });
  }

}
