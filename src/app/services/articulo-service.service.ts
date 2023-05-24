import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoriaModel } from '../models/categoria.model';
import { ArticuloModel } from '../models/articulo.model';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ArticuloServiceService {

  private SERVER = environment.server;
  BASE_URL_ARTICULO = `${this.SERVER}articulo`;
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
            Swal.fire({
              title: 'Se ha agregado con éxito el articulo',
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

  updateArticulo(articulo: any): Promise<any> {
    return new Promise((resolve) => {
      this._httpClient.put(`${this.BASE_URL_ARTICULO}/${articulo.id}`, articulo)
      .subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Se ha modificado con éxito el articulo, si no se muestra el cambio le sugerimos recargar nuevamente la página',
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

  deleteArticulo(id: any): Promise<any> {
    return new Promise((resolve) => {
      this._httpClient.delete(`${this.BASE_URL_ARTICULO}/${id}`)
      .subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Se ha eliminado con éxito el articulo, si no se muestra el cambio le sugerimos recargar nuevamente la página',
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
