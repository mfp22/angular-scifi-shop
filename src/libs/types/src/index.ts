import { Product } from '@scifi/product';
import { Status } from '@scifi/http';

/* NgRx types for state management */

export type StacktraceError = {
  error: {
    message: string;
    stack: string;
  };
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
