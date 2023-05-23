import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoriaModel } from '../models/categoria.model';
import { ArticuloModel } from '../models/articulo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticuloServiceService {

  private SERVER = environment.server;
  BASE_URL_ARTICULO = `${this.SERVER}/articulo`;
  constructor(private _httpClient: HttpClient) { }

  getAllArticulos(): Observable<any> {
    return this._httpClient.get(`${this.BASE_URL_ARTICULO}`);
  }

  getArticulo(id: any): Observable<any> {
    return this._httpClient.get(`${this.BASE_URL_ARTICULO}/${id}`);
  }

  postArticulo(articulo: ArticuloModel): Promise<any> {
    return new Promise((resolve) => {
      this._httpClient.post(`${this.BASE_URL_ARTICULO}`, articulo)
        .subscribe({
          next: (response) => {
            resolve(response);
          },
          error: (err) => {
            console.log('error al agregar la respuesta', err);
          }
        });
    });
  }

  updateCategoria(articulo: ArticuloModel): Promise<any> {
    return new Promise((resolve) => {
      this._httpClient.put(`${this.BASE_URL_ARTICULO}/${articulo.id}`, articulo)
        .subscribe({
          next: (response) => {
            resolve(response);
          },
          error: (err) => {
            console.log('error al cambiar la respuesta', err)
          }
        })
    });
  }

  deleteArticulo(id: any): Promise<any> {
    return new Promise((resolve) => {
      this._httpClient.delete(`${this.BASE_URL_ARTICULO}/${id}`).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: (err) => {
          console.log('error al eliminar el cuestionario', err);
        }
      })
    })
  }
}
