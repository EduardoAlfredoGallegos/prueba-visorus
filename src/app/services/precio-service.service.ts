import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrecioServiceService {

  private SERVER = environment.server;
  BASE_URL_ARTICULO = `${this.SERVER}/articulo`;
  constructor() { }
}
