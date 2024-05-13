import { Rating } from './rating.type';

export type NewReviewRequest = {
  customerId: number;
  productId: number;
  orderId: number;
  title: string;
  body: string;
  rating: Rating;
  recommend?: boolean;
};
