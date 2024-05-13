export type ProductsUrlParams = {
  page?: string | number;
  limit?: string | number;
  minPrice?: string | number;
  maxPrice?: string | number;
  category?: string;
  supplier?: string;
  product?: string;
  hideOutOfStock?: boolean;
  orderBy?: string;
  order?: string;
  avgRating?: string | number;
};
