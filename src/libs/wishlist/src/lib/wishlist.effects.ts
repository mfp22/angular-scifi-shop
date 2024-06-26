import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { dispatchErrorAction } from '@scifi/dialog/notification.actions';
import { catchError, exhaustMap, map, withLatestFrom } from 'rxjs';
import {
  loadWishlist,
  loadWishlistSuccess,
  updateWishlist,
  updateWishlistSuccess,
} from './wishlist.actions';
import { selectWishlist } from './wishlist.feature';
import { Wishlist } from './wishlist.type';
import { WishlistService } from './wishlist.service';

@Injectable()
export class WishlistEffects {
  loadWishlist$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadWishlist),
      exhaustMap(({ customerId, format }) => {
        return this._wishlistService.getWishlistItems(customerId, format).pipe(
          map(({ wishlist }) => {
            return loadWishlistSuccess(wishlist);
          }),
          catchError(dispatchErrorAction),
        );
      }),
    ),
  );

  updateWishList$ = createEffect(() =>
    this._actions$.pipe(
      ofType(updateWishlist),
      withLatestFrom(this._store.select(selectWishlist)),
      exhaustMap(([{ updatedWishlist, customerId }, previousWishlist]) => {
        return this._wishlistService.updateWishlist(updatedWishlist, customerId).pipe(
          map(({ wishlist }) => {
            if (Array.isArray(wishlist) && wishlist.length === 0) {
              return updateWishlistSuccess({
                ...previousWishlist!,
                wishlistItems: [],
              });
            }
            return updateWishlistSuccess(wishlist as Wishlist);
          }),
          catchError(dispatchErrorAction),
        );
      }),
    ),
  );

  constructor(
    private _actions$: Actions,
    private _wishlistService: WishlistService,
    private _store: Store,
  ) {}
}
