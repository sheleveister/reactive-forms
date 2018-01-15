import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Product } from './product.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProductService {

  private url = 'http://localhost:2403/products';

  constructor(
    private http: Http
  ) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get(this.url)
      .map((response: Response) => {
        return response.json().map((product): Product[] => product);
      })
      .catch(this.handleError);
  }

  public getProduct(id: string): Observable<Product> {
    return this.http.get(`${this.url}/${id}`)
      .map((response: Response) => {
        const res = response.json();
        return new Product(
          res.id,
          res.name,
          res.price
        );
      })
      .catch(this.handleError);
  }

  public addProduct(product: Product): Observable<Product> {
    return this.http.post(this.url, product)
      .catch(this.handleError);
  }

  public updateProduct(product: Product): Observable<Product> {
    return this.http.put(`${this.url}/${product.id}`, product)
      .catch(this.handleError);
  }

  public deleteProduct(product: Product): Observable<Product> {
    return this.http.delete(`${this.url}/${product.id}`, product)
      .catch(this.handleError);
  }

  private handleError(error: any, cought: Observable<any>) {
    let message = '';

    if ( error instanceof Response ) {
      const errorData = error.json().error || JSON.stringify(error.json());
      message = `${error.status} - ${error.statusText || ''} ${errorData}`;
    } else {
      message = error.message ? error.message : error.toString();
    }

    console.error(message);
    return Observable.throw(message);
  }

}
