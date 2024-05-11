import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectLoggedInUserId } from '@scifi/ngrx/auth/auth.feature';
import {
  selectActiveId,
  selectUpdateStatus,
} from '@scifi/ngrx/cart/cart.feature';
import { selectData } from '@scifi/ngrx/notification/notification.feature';
import {
  loadSingleProduct,
  searchOrderHistory,
} from '@scifi/ngrx/products/products.actions';
import {
  selectLoadStatus,
  selectOrderSearchResult,
  selectSearchStatus,
  selectSingleProduct,
} from '@scifi/ngrx/products/products.feature';
import {
  deleteReview,
  resetReviewsStatus,
  updateActiveId,
} from '@scifi/ngrx/reviews/reviews.actions';
import {
  selectCreateStatus,
  selectDeleteStatus,
  selectReviewStatus,
  selectUpdateStatus as selectReviewUpdateStatus,
} from '@scifi/ngrx/reviews/reviews.feature';
import { ReviewDialogComponent } from '@scifi/reviews/review-dialog/review-dialog.component';
import {
  AppState,
  DialogContent,
  NewReviewRequest,
  OrderSearchResponse,
  Product,
  Rating,
  Review,
  SingleProduct,
  Status,
} from '@scifi/types';
import {
  Observable,
  Subscription,
  combineLatest,
  map,
  shareReplay,
} from 'rxjs';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.sass'],
})
export class SingleProductComponent {
  public productId: string | undefined | null;
  public loggedInUserId: string | number | null | undefined;
  private _orderId: number | undefined;
  readonly singleProduct$: Observable<SingleProduct | null> =
    this._store.select(selectSingleProduct);
  readonly loadStatus$: Observable<Status> =
    this._store.select(selectLoadStatus);
  readonly cartUpdateStatus$: Observable<Status> =
    this._store.select(selectUpdateStatus);
  readonly reviewStatus$: Observable<Status> =
    this._store.select(selectReviewStatus);
  readonly reviewCreateStatus$: Observable<Status> =
    this._store.select(selectCreateStatus);
  readonly reviewUpdateStatus$: Observable<Status> = this._store.select(
    selectReviewUpdateStatus
  );
  readonly reviewDeleteStatus$: Observable<Status> =
    this._store.select(selectDeleteStatus);
  readonly activeId$: Observable<number> = this._store.select(selectActiveId);
  readonly orderSearchResult$: Observable<OrderSearchResponse | null> =
    this._store.select(selectOrderSearchResult);
  readonly searchStatus$: Observable<Status> =
    this._store.select(selectSearchStatus);
  readonly loggedInUserId$: Observable<string | number | null> =
    this._store.select(selectLoggedInUserId);
  readonly errorData$: Observable<DialogContent | null> =
    this._store.select(selectData);
  private _customerId: number | undefined;
  private _subscription = Subscription.EMPTY;
  private _searchResultSubscription = Subscription.EMPTY;
  private _404Subscription = Subscription.EMPTY;
  private _singleProductSubscription = Subscription.EMPTY;
  private _isHandset = false;
  showCreateReviewButton = false;
  render404 = false;
  isHandset$: Observable<boolean> = this._breakpointObserver
    .observe('(max-width: 540px)')
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  readonly dataStream$ = combineLatest([
    this._route.paramMap,
    this.isHandset$,
    this.reviewCreateStatus$,
    this.reviewUpdateStatus$,
    this.reviewDeleteStatus$,
    this.loggedInUserId$,
  ]).pipe(
    map(
      ([
        paramMap,
        isHandset,
        createStatus,
        updateStatus,
        deleteStatus,
        loggedInUserId,
      ]) => ({
        paramMap,
        isHandset,
        createStatus,
        updateStatus,
        deleteStatus,
        loggedInUserId,
      })
    )
  );

  constructor(
    private _store: Store<AppState>,
    private _route: ActivatedRoute,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _breakpointObserver: BreakpointObserver,
    private _titleService: Title
  ) {}

  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this._searchResultSubscription = this.orderSearchResult$.subscribe(
      (orderSearchResult) => {
        if (orderSearchResult) {
          if (orderSearchResult.lastOrdered && !orderSearchResult.review) {
            this.showCreateReviewButton = true;
            this._orderId = orderSearchResult.lastOrdered.orderId;
          } else {
            this.showCreateReviewButton = false;
          }
        }
      }
    );

    this._subscription = this.dataStream$.subscribe(
      ({
        paramMap,
        isHandset,
        createStatus,
        updateStatus,
        deleteStatus,
        loggedInUserId,
      }) => {
        const productId = paramMap.get('id');
        if (this.productId !== productId) {
          this._store.dispatch(
            loadSingleProduct({ productId: Number(productId) })
          );
        }
        this.productId = productId;
        this.loggedInUserId = loggedInUserId;
        this._isHandset = isHandset;

        if (
          loggedInUserId &&
          [createStatus, updateStatus, deleteStatus].some(
            (status) => status === 'success'
          )
        ) {
          const snackBarMessage =
            createStatus === 'success'
              ? 'Your review has been published.'
              : updateStatus === 'success'
              ? 'Review successfully updated.'
              : deleteStatus === 'success'
              ? 'Your review has been deleted.'
              : 'Done';
          this._store.dispatch(
            searchOrderHistory({
              customerId: Number(loggedInUserId),
              productId: Number(productId),
            })
          );
          this._snackBar.open(snackBarMessage, 'Dismiss', {
            horizontalPosition: 'start',
            verticalPosition: 'top',
            duration: 7000,
          });
        }

        if (loggedInUserId) {
          this._customerId = Number(loggedInUserId);
        }
      }
    );

    this._404Subscription = this.errorData$.subscribe((data) => {
      if ([404, 400].includes(data?.error?.status || 0)) {
        this.render404 = true;
      }
    });

    this._singleProductSubscription = this.singleProduct$.subscribe(
      (product) => {
        if (product) {
          this._titleService.setTitle(product.name);
        }
      }
    );

    if (this._customerId) {
      this._store.dispatch(
        searchOrderHistory({
          customerId: this._customerId,
          productId: Number(this.productId),
        })
      );
    }
  }

  get lightModeEnabled() {
    return document.body.classList.contains('light-mode');
  }

  newReviewTemplate(product: Product): NewReviewRequest & { product: Product } {
    return {
      customerId: Number(this._customerId!),
      productId: Number(this.productId!),
      orderId: this._orderId!,
      title: '',
      body: '',
      rating: 0 as Rating,
      product,
    };
  }

  showDialog(
    review: NewReviewRequest | Review,
    operation: 'create' | 'update'
  ) {
    this._store.dispatch(resetReviewsStatus());
    this.dialog.open(ReviewDialogComponent, {
      data: { review, operation },
      width: this._isHandset ? '100vw' : '80vw',
      maxWidth: '1000px',
    });
  }

  deleteReview(reviewId: number) {
    this._store.dispatch(updateActiveId({ activeId: reviewId }));
    this._store.dispatch(resetReviewsStatus());
    this._store.dispatch(deleteReview({ reviewId }));
  }

  ngOnDestroy() {
    this._store.dispatch(resetReviewsStatus());
    this._subscription.unsubscribe();
    this._searchResultSubscription.unsubscribe();
    this._404Subscription.unsubscribe();
    this._singleProductSubscription.unsubscribe();
  }
}
