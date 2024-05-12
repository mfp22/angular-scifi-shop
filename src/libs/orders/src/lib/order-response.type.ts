import { Order } from './order.type';

export type OrdersResponse = {
  id: number;
  name: string;
  username: string;
  orders: Order[] | [];
};
