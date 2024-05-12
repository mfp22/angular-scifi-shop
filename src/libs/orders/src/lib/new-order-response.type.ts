import { Address } from '@scifi/address';
import { Order } from './order.type';

export type NewOrderResponse = Order & {
  billingAddress: Address;
};
