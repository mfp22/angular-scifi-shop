import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewReviewRequest } from './new-review-request.type';
import { Review } from './review.type';
import { Rating } from './rating.type';
import { Pagination } from '@scifi/pagination';
import { Customer } from '@scifi/account/customer.type';

export type UpdateReviewRequest = {
  title?: string;
  body?: string;
  recommend?: boolean | null;
  rating?: Rating;
};

export type FavoritesResponse = Pagination & {
  favorites: Review[] | [];
};

export type CustomerReviewsResponse = Pagination & {
  customer: Customer;
  reviews: Review[] | [];
};

export type ReviewsResponse = Pagination & {
  reviews: Review[] | [];
};

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private _baseUrl = 'https://taliphus.vercel.app/api';

  constructor(private _http: HttpClient) {}

  getAllReviews(queryParams: { page: number; limit: number }) {
    return this._http.get<ReviewsResponse>(`${this._baseUrl}/reviews`, {
      params: new HttpParams().appendAll(queryParams),
    });
  }

  getProductReviews(productId: number, queryParams: { page: number; limit: number }) {
    return this._http.get<ReviewsResponse>(`${this._baseUrl}/products/${productId}/reviews`, {
      params: new HttpParams().appendAll(queryParams),
    });
  }

  getCustomerReviews(customerId: number, queryParams: { page: number; limit: number }) {
    return this._http.get<CustomerReviewsResponse>(
      `${this._baseUrl}/customers/${customerId}/reviews`,
      {
        params: new HttpParams().appendAll(queryParams),
      },
    );
  }

  getFavorites(customerId: number) {
    return this._http.get<FavoritesResponse>(`${this._baseUrl}/customers/${customerId}/favorites`, {
      withCredentials: true,
    });
  }

  createReview(requestBody: NewReviewRequest) {
    return this._http.post<{ newReview: Review }>(`${this._baseUrl}/reviews`, requestBody, {
      withCredentials: true,
    });
  }

  updateReview(reviewId: number, requestBody: UpdateReviewRequest) {
    return this._http.put<{ updatedReview: Review }>(
      `${this._baseUrl}/reviews/${reviewId}`,
      requestBody,
      {
        withCredentials: true,
      },
    );
  }

  deleteReview(reviewId: number) {
    return this._http.delete<{ deletedReview: Review }>(`${this._baseUrl}/reviews/${reviewId}`, {
      withCredentials: true,
    });
  }
}
