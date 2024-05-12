import { Address } from '@scifi/address';

export type Customer = {
  id: number;
  name: string;
  email: string;
  username: string;
  joinDate: string;
  phone: string | null;
  billingAddressId: number | null;
  shippingAddressId: number | null;
  password: string;
  avatar: string | null;
  billingAddress?: Address | null;
  shippingAddress?: Address | null;
};
