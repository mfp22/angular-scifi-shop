import { Address } from '@scifi/address';
import { Product } from '@scifi/product';

export type Order = {
  id: number;
  customerId: number;
  billingAddressId: number;
  shippingAddressId: number;
  status: string;
  paymentMethod: string;
  total: string;
  createdAt: string;
  shippingAddress: Address;
  orderItems: {
    quantity: number;
    product: Product;
  }[];
};
