import { Status } from '@scifi/http';
import { AccountActiveItem } from './account-active-item.type';
import { Customer } from './customer.type';

export type AccountState = {
  account: Customer | null;
  loadStatus: Status;
  updateStatus: Status;
  deleteStatus: Status;
  deleteMsg: {
    msg: string;
    deletedUser: null | {
      id: number;
      name: string;
      username: string;
      email: string;
    };
  };
  activeItem: AccountActiveItem;
};
