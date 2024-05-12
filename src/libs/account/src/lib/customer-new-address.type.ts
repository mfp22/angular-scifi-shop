import { Address } from '@scifi/address';
import { Customer } from './customer.type';

export type CustomerNewAddress = {
  newAddress: Address;
  customer: Customer;
};
