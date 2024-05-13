import { Status } from '@scifi/http';
import { Cart } from './cart.type';

export type CartState = {
  loadStatus: Status;
  updateStatus: Status;
  activeId: number;
  cart: Cart | null;
};
