import { Status } from '@scifi/http';
import { ExpressCheckoutItem } from '@scifi/product';
import { NewOrderResponse } from './new-order-response.type';
import { OrdersResponse } from './order-response.type';
import { SingleOrderResponse } from './single-order-response.type';

export type OrdersState = {
  orders: OrdersResponse | null;
  singleOrder: SingleOrderResponse | null;
  expressCheckoutItem: ExpressCheckoutItem | null;
  newOrder: NewOrderResponse | null;
  loadStatus: Status;
  createStatus: Status;
  updateStatus: Status;
  deleteStatus: Status;
};
