import { Pagination } from '@scifi/pagination';
import { Product, SingleProduct } from '@scifi/product';
import { Status } from '@scifi/http';
import { Review } from '@scifi/reviews/review.type';

// Response returned from searching order history for a specific product id
export type OrderSearchResponse = {
  productId: number;
  lastOrdered: {
    orderId: number;
    orderDate: string;
  } | null;
  review: Review | null;
};

/* NgRx types for state management */

export type StacktraceError = {
  error: {
    message: string;
    stack: string;
  };
};

export type ProductsState = {
  pagination: Pagination;
  products: Product[] | [] | null;
  singleProduct: SingleProduct | null;
  searchTerm: string | null;
  orderSearchResult: OrderSearchResponse | null;
  loadStatus: Status;
  searchStatus: Status;
};

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

export type CartItemDetail = {
  quantity: number;
  product: Product;
};

export type Cart = {
  id: number;
  name: string;
  username: string;
  cartItems: CartItemDetail[] | [];
};

export type CartItem = {
  productId: number;
  customerId: number;
  quantity: number;
};

export type CartState = {
  loadStatus: Status;
  updateStatus: Status;
  activeId: number;
  cart: Cart | null;
};

export type WishlistItem = {
  productId: number;
  customerId: number;
};

export type WishlistBasic = WishlistItem[] | [];

export type Wishlist = {
  id: number;
  name: string;
  username: string;
  wishlistItems: { product: Product }[] | [];
};

export type WishlistState = {
  loadStatus: Status;
  updateStatus: Status;
  activeId: number;
  wishlist: Wishlist | null;
};
