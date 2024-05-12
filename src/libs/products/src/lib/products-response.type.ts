import { Pagination } from '@scifi/pagination';
import { Product } from '@scifi/product';

export type ProductsResponse = Pagination & {
  products: Product[] | [];
};
