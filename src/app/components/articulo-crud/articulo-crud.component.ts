import { Component, OnInit } from '@angular/core';
import { ArticuloModel } from 'src/app/models/articulo.model';
import { ArticuloServiceService } from 'src/app/services/articulo-service.service';

@Component({
  selector: 'app-articulo-crud',
  templateUrl: './articulo-crud.component.html',
  styleUrls: ['./articulo-crud.component.css']
})
export class ArticuloCrudComponent implements OnInit {

  articulos: ArticuloModel[];
  constructor(private articuloService: ArticuloServiceService) { }

  ngOnInit(): void {
    this.articuloService.getAllArticulos().subscribe(res => {
      this.articulos = res.data;
    });
  }

}
