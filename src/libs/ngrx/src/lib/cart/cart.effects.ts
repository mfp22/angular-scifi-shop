import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CartService } from '@scifi/cart/cart.service';
import { dispatchErrorAction } from '@scifi/dialog/notification.actions';
import { Cart } from '@scifi/types';
import { catchError, exhaustMap, map, withLatestFrom } from 'rxjs/operators';
import {
  addToCart,
  clearCart,
  loadCart,
  loadCartSuccess,
  modifyQuantity,
  removeCartItem,
  updateCartSuccess,
} from './cart.actions';
import { selectCartItems } from './cart.feature';

@Injectable()
export class CartEffects {
  formatActionPayload({ cart }: { cart: Cart | [] }) {
    const cartItems = (cart as Cart).cartItems || cart;
    return updateCartSuccess({ cartItems } as { cartItems: Cart | [] });
  }

  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCart),
      exhaustMap(({ customerId }) =>
        this.cartService.getCart(customerId).pipe(
          map((cartResponse) => loadCartSuccess(cartResponse.cart)),
          catchError(dispatchErrorAction),
        ),
      ),
    ),
  );

  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToCart),
      withLatestFrom(this.store.select(selectCartItems)),
      exhaustMap(([cartItem, cartItems]) => {
        return this.cartService.updateCart([...cartItems, cartItem], cartItem.customerId).pipe(
          map((cartResponse) => this.formatActionPayload(cartResponse)),
          catchError(dispatchErrorAction),
        );
      }),
    ),
  );

  removeCartItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeCartItem),
      withLatestFrom(this.store.select(selectCartItems)),
      exhaustMap(([{ productId, customerId }, cartItems]) => {
        return this.cartService
          .updateCart(
            cartItems.filter((item) => item.productId !== productId),
            customerId,
          )
          .pipe(
            map((cartResponse) => this.formatActionPayload(cartResponse)),
            catchError(dispatchErrorAction),
          );
      }),
    ),
  );

  modifyQuantity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(modifyQuantity),
      withLatestFrom(this.store.select(selectCartItems)),
      exhaustMap(([{ productId, customerId, quantity }, cartItems]) => {
        return this.cartService
          .updateCart(
            cartItems.map((item) => {
              if (item.productId === productId) {
                return { ...item, quantity };
              } else {
                return item;
              }
            }),
            customerId,
          )
          .pipe(
            map((cartResponse) => this.formatActionPayload(cartResponse)),
            catchError(dispatchErrorAction),
          );
      }),
    ),
  );

  clearCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clearCart),
      exhaustMap(({ customerId }) =>
        this.cartService.updateCart([], customerId).pipe(
          map((cartResponse) => this.formatActionPayload(cartResponse)),
          catchError(dispatchErrorAction),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private cartService: CartService, private store: Store) {}
}
