import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectLoggedInUserId } from '@scifi/ngrx/auth/auth.feature';
import {
  deleteReview,
  resetReviewsStatus,
  updateActiveId,
} from '@scifi/ngrx/reviews/reviews.actions';
import {
  selectActiveId,
  selectLoadStatus,
  selectPagination,
  selectReviewStatus,
  selectReviews,
} from '@scifi/ngrx/reviews/reviews.feature';
import {
  AppState,
  NewReviewRequest,
  Product,
  Review,
  Status,
  UpdateReviewRequest,
} from '@scifi/types';
import { Observable } from 'rxjs';
import { ReviewDialogComponent } from '../review-dialog/review-dialog.component';
import { Pagination } from '@scifi/pagination';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.sass'],
})
export class ReviewsComponent {
  @Input() component: 'reviews' | 'product' | undefined;
  @Input() productId: number | undefined;
  @Input() showCreateReviewButton = false;
  @Input() newReviewTemplate: (NewReviewRequest & { product: Product }) | undefined;
  readonly reviews$: Observable<Review[] | [] | null> = this._store.select(selectReviews);
  readonly pagination$: Observable<Pagination> = this._store.select(selectPagination);
  readonly loadStatus$: Observable<Status> = this._store.select(selectLoadStatus);
  readonly reviewStatus$: Observable<Status> = this._store.select(selectReviewStatus);
  readonly loggedInUserId$: Observable<string | number | null> =
    this._store.select(selectLoggedInUserId);
  readonly activeId$: Observable<number> = this._store.select(selectActiveId);

  constructor(private _store: Store<AppState>, public dialog: MatDialog) {}

  showDialog(review: NewReviewRequest | UpdateReviewRequest, operation: 'create' | 'update') {
    this._store.dispatch(resetReviewsStatus());
    this.dialog.open(ReviewDialogComponent, {
      data: { review, operation },
      width: '100vw',
      maxWidth: '1000px',
    });
  }

  deleteReview(reviewId: number) {
    this._store.dispatch(updateActiveId({ activeId: reviewId }));
    this._store.dispatch(resetReviewsStatus());
    this._store.dispatch(deleteReview({ reviewId }));
  }
}
