import { CartItemDetail } from './cart-item-detail.type';

export type Cart = {
  id: number;
  name: string;
  username: string;
  cartItems: CartItemDetail[] | [];
};
