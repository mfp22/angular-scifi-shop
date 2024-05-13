import { Product } from '@scifi/product';
import { NewReviewRequest } from './new-review-request.type';

export type Review = NewReviewRequest & {
  id: number;
  recommend: boolean | null;
  createdAt?: string;
  addedAt?: string;
  product?: Product;
  customer?: {
    username: string;
    avatar: string | null;
  };
};
