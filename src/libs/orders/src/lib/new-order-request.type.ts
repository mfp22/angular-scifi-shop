import { Address } from '@scifi/address';

export type NewOrderRequest = {
  billingAddress: Address;
  shippingAddress: Address;
  item?: {
    productId: number;
    quantity: number;
  };
};
