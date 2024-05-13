import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SingleProduct } from '@scifi/product';
import { OrderSearchResponse, ProductsUrlParams } from '@scifi/types';
import { ProductsResponse } from './products-response.type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl = 'https://taliphus.vercel.app/api';

  constructor(private _http: HttpClient) {}

  getProducts(queryParams: ProductsUrlParams) {
    const options = {
      params: new HttpParams().appendAll(queryParams),
    };

    return this._http.get<ProductsResponse>(`${this.baseUrl}/products`, options);
  }

  getSingleProduct(productId: number) {
    return this._http.get<SingleProduct>(`${this.baseUrl}/products/${productId}`);
  }

  getProductFromOrderHistory(customerId: number, productId: number) {
    return this._http.get<OrderSearchResponse>(
      `${this.baseUrl}/customers/${customerId}/orders?productId=${productId}`,
      { withCredentials: true },
    );
  }
}
