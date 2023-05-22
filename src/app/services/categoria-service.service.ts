import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CategoriaModel } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaServiceService {

  private SERVER = environment.server;
  BASE_URL_CATEGORIA = `${this.SERVER}/categoria`;
  constructor(private _httpClient: HttpClient) { }

  getAllCategorias(): Observable<any> {
    return this._httpClient.get(`${this.BASE_URL_CATEGORIA}`);
  }

  getCategoria(id: any): Observable<any> {
    return this._httpClient.get(`${this.BASE_URL_CATEGORIA}/${id}`);
  }

  postCategoria(categoria: CategoriaModel): Promise<any> {
    return new Promise((resolve) => {
      this._httpClient.post(`${this.BASE_URL_CATEGORIA}`, categoria)
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

  updateCategoria(categoria: CategoriaModel): Promise<any> {
    return new Promise((resolve) => {
      this._httpClient.put(`${this.BASE_URL_CATEGORIA}/${categoria.id}`, categoria)
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

  deleteCategoria(id: any): Promise<any> {
    return new Promise((resolve) => {
      this._httpClient.delete(`${this.BASE_URL_CATEGORIA}`, id).subscribe({
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
