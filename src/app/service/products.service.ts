import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = '/api'

  constructor(
    private http: HttpClient
  ) { }

  getProducts(id: any = ''): Observable<any> {
    if(id === null) {
      return this.http.get(this.apiUrl + '/bp/products');
    } else {
      return this.http.get(this.apiUrl + '/bp/products/' + id);
    }
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl + '/bp/products', product);
  }

  updateProduct(product: any, id: any): Observable<any> {
    return this.http.put(this.apiUrl + '/bp/products/' + id, product);
  }

  deleteProduct(id: any): Observable<any> {
    return this.http.delete(this.apiUrl + '/bp/products/' + id);
  }

  verifyProduct(id: any): Observable<any> {
    return this.http.get(this.apiUrl + '/bp/products/verification/' + id);
  }
}
