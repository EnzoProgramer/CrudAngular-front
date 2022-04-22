import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product/product';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }

  getProducts(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'consultProducts');
  }

  deleteProducts(id: string): Observable<any> {
    return this._http.delete(this.url + 'deleteProduct/' + id)
  }

  saveProducts(product: Product): Observable<any> {
    return this._http.post(this.url + 'createProduct', product);
  }

  consultProduct(id: string): Observable<any> {
    return this._http.get(this.url + 'consultProduct/' + id)
  }

  updateProduct(id: string, product: Product): Observable<any> {
    return this._http.put(this.url + 'updateProduct/' + id, product);
  }
}
