import { createAction, props } from '@ngrx/store';
import {
  OrderSearchResponse,
  ProductsResponse,
  ProductsUrlParams,
  SingleProduct,
} from '@scifi/types';

export const loadProducts = createAction(
  '[ProductList Component] Load Products',
  props<ProductsUrlParams>(),
);

export const loadProductsSuccess = createAction(
  '[ProductList Component] Load Products - Success',
  props<ProductsResponse>(),
);

export const loadSingleProduct = createAction(
  '[SingleProduct Component] Load Single Product',
  props<{ productId: number }>(),
);

export const loadSingleProductSuccess = createAction(
  '[SingleProduct Component] Load Single Product - Success',
  props<SingleProduct>(),
);

export const searchOrderHistory = createAction(
  '[SingleProduct Component] Search Order History - Loading',
  props<{ customerId: number; productId: number }>(),
);

export const searchOrderHistorySuccess = createAction(
  '[SingleProduct Component] Search Order History - Success',
  props<OrderSearchResponse>(),
);
