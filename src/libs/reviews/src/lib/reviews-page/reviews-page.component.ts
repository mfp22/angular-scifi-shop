import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAccount } from '@scifi/account/account.feature';
import { Customer } from '@scifi/account/customer.type';
import { DialogContent } from '@scifi/dialog/dialog-content.type';
import { selectData } from '@scifi/dialog/notification.feature';
import { Status } from '@scifi/http';
import { resetReviewsStatus } from '@scifi/ngrx/reviews/reviews.actions';
import {
  selectCustomer,
  selectDeleteStatus,
  selectPagination,
  selectReviews,
  selectUpdateStatus,
} from '@scifi/ngrx/reviews/reviews.feature';
import { Pagination } from '@scifi/pagination';
import { Review } from '@scifi/types';
import { Observable, Subscription, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-reviews-page',
  templateUrl: './reviews-page.component.html',
  styleUrls: ['./reviews-page.component.sass'],
})
export class ReviewsPageComponent {
  readonly accountData$: Observable<Customer | null> = this._store.select(selectAccount);
  readonly reviews$: Observable<Review[] | [] | null> = this._store.select(selectReviews);
  readonly customer$: Observable<Customer | null> = this._store.select(selectCustomer);
  readonly pagination$: Observable<Pagination> = this._store.select(selectPagination);
  readonly updateStatus$: Observable<Status> = this._store.select(selectUpdateStatus);
  readonly deleteStatus$: Observable<Status> = this._store.select(selectDeleteStatus);
  readonly errorStatus$: Observable<DialogContent | null> = this._store.select(selectData);
  private _errorSubscription = Subscription.EMPTY;
  private _reviewStatusSubscription = Subscription.EMPTY;
  public show404 = false;

  readonly dataStream$ = combineLatest([this.reviews$, this.pagination$, this.customer$]).pipe(
    map(([reviews, pagination, customer]) => ({
      reviews,
      pagination,
      customer,
    })),
  );

  readonly statusStream$ = combineLatest([this.updateStatus$, this.deleteStatus$]).pipe(
    map(([updateStatus, deleteStatus]) => ({ updateStatus, deleteStatus })),
  );

  constructor(private _store: Store, private _router: Router, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    window.scrollTo({ top: 0 });
    this._errorSubscription = this.errorStatus$.subscribe((data) => {
      if (data?.error?.status === 404) {
        this.show404 = true;
      }
    });

    this._reviewStatusSubscription = this.statusStream$.subscribe(
      ({ updateStatus, deleteStatus }) => {
        let snackBarMessage = 'Review successfully ';
        if (updateStatus === 'success') snackBarMessage += 'updated.';
        if (deleteStatus === 'success') snackBarMessage += 'deleted.';
        if (updateStatus === 'success' || deleteStatus === 'success') {
          this._snackBar.open(snackBarMessage, 'Dismiss', {
            horizontalPosition: 'start',
            verticalPosition: 'top',
            duration: 7000,
          });
          this._store.dispatch(resetReviewsStatus());
        }
      },
    );
  }

  loadAllReviews() {
    this._router.navigate([]);
  }

  loadMyReviews(customerId: number) {
    this._router.navigate([], {
      queryParams: { customerId },
    });
  }

  ngOnDestroy() {
    this._errorSubscription.unsubscribe();
    this._reviewStatusSubscription.unsubscribe();
  }
}
