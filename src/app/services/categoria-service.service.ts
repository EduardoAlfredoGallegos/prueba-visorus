import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CategoriaModel } from '../models/categoria.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CategoriaServiceService {

  categoria: any;
  private SERVER = environment.server;
  BASE_URL_CATEGORIA = `${this.SERVER}categoria`;
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
          Swal.fire({
            title: 'Se ha agregado con éxito la categoria',
            icon: 'success',
            confirmButtonText: 'Entendido'
          })
          resolve(response);
        },
        error: (err) => {
          var alerta: string = '';
          for (let index = 0; index < err.error.errores.length; index++) {
            alerta = alerta + "\n" + err.error.errores[index].error;
          }
          Swal.fire({
            title: err.error.error,
            text: alerta,
            icon: 'error',
            confirmButtonText: 'Entendido'
          })
        }
      });
    });
  }

  updateCategoria(categoria: CategoriaModel): Promise<any> {
    return new Promise((resolve) => {
      this._httpClient.put(`${this.BASE_URL_CATEGORIA}/${categoria.id}`, categoria)
      .subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Se ha modificado con éxito la categoria, si no se muestra el cambio le sugerimos recargar nuevamente la página',
            icon: 'success',
            confirmButtonText: 'Entendido'
          })
          resolve(response);
        },
        error: (err) => {
          var alerta: string = '';
          for (let index = 0; index < err.error.errores.length; index++) {
            alerta = alerta + "\n" + err.error.errores[index].error;
          }
          Swal.fire({
            title: err.error.error,
            text: alerta,
            icon: 'error',
            confirmButtonText: 'Entendido'
          })
        }
      });
    });
  }

  deleteCategoria(id: any): Promise<any> {
    return new Promise((resolve) => {
      this._httpClient.delete(`${this.BASE_URL_CATEGORIA}/${id}`)
      .subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Se ha eliminado con éxito la categoria, si no se muestra el cambio le sugerimos recargar nuevamente la página',
            icon: 'success',
            confirmButtonText: 'Entendido'
          })
          resolve(response);
        },
        error: (err) => {
          var alerta: string = '';
          for (let index = 0; index < err.error.errores.length; index++) {
            alerta = alerta + "\n" + err.error.errores[index].error;
          }
          Swal.fire({
            title: err.error.error,
            text: alerta,
            icon: 'error',
            confirmButtonText: 'Entendido'
          })
        }
      });
    })
  }

}
