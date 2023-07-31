import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductType} from "../../types/product.type";
import {OrderType} from "../../types/order.type";

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {
  private url: string = 'https://testologia.site';

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(this.url + '/tea');
  }

  getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(this.url + '/tea?id=' + id);
  }

  sendDataForOrder(data: OrderType) {
    return this.http.post<{ success: boolean, message?: string }>(this.url + '/order-tea', data)
  }

  getSearchRequest(keyword: string): Observable<any> {
    return this.http.get(this.url + '/tea?search=' + keyword)
  }
}
