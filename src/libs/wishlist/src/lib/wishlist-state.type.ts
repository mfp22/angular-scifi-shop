import { Status } from '@scifi/http';
import { Wishlist } from './wishlist.type';

export type WishlistState = {
  loadStatus: Status;
  updateStatus: Status;
  activeId: number;
  wishlist: Wishlist | null;
};
