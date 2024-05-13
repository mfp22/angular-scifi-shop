import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from './cart-item.type';
import { Cart } from './cart.type';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _url = `https://taliphus.vercel.app/api/customers`;

  constructor(private _http: HttpClient) {}

  getCart(customerId: number) {
    return this._http.get<{ cart: Cart }>(`${this._url}/${customerId}/cart`, {
      withCredentials: true,
    });
  }

  updateCart(updatedCart: CartItem[] | [], customerId: number) {
    return this._http.put<{ cart: Cart | [] }>(`${this._url}/${customerId}/cart`, updatedCart, {
      withCredentials: true,
    });
  }
}
