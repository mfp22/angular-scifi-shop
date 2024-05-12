export type UpdateCustomerRequest = {
  username?: string;
  password?: string;
  name?: string;
  email?: string;
  phone?: string | null;
  avatar?: string | null;
};
