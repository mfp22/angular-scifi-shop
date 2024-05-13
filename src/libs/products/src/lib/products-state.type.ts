import { Status } from '@scifi/http';
import { Pagination } from '@scifi/pagination';
import { Product, SingleProduct } from '@scifi/product';
import { OrderSearchResponse } from './order-search-response.type';

export type ProductsState = {
  pagination: Pagination;
  products: Product[] | [] | null;
  singleProduct: SingleProduct | null;
  searchTerm: string | null;
  orderSearchResult: OrderSearchResponse | null;
  loadStatus: Status;
  searchStatus: Status;
};
