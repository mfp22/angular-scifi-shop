import { Customer } from '@scifi/account/customer.type';
import { Status } from '@scifi/http';
import { Pagination } from '@scifi/pagination';
import { Review } from './review.type';

export type ReviewsState = {
  pagination: Pagination;
  reviews: Review[] | [] | null;
  customer: Customer | null;
  favorites: Review[] | [] | null;
  singleReview: Review | null;
  activeId: number;
  loadStatus: Status;
  createStatus: Status;
  updateStatus: Status;
  deleteStatus: Status;
};
