import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from './category.type';
import { Supplier } from './supplier.type';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  baseUrl = 'https://taliphus.vercel.app/api';

  constructor(private _http: HttpClient) {}

  getCategories() {
    return this._http.get<{ categories: Category[] }>(`${this.baseUrl}/categories`);
  }

  getSuppliers() {
    return this._http.get<{ suppliers: Supplier[] }>(`${this.baseUrl}/suppliers`);
  }
}
