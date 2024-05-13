import { Review } from '@scifi/reviews/review.type';

export type OrderSearchResponse = {
  productId: number;
  lastOrdered: {
    orderId: number;
    orderDate: string;
  } | null;
  review: Review | null;
};
