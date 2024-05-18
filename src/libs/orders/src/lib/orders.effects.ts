import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { dispatchErrorAction } from '@scifi/dialog/notification.actions';
import { catchError, exhaustMap, map } from 'rxjs';
import {
  createOrder,
  createOrderSuccess,
  deleteOrder,
  deleteOrderSuccess,
  loadOrders,
  loadOrdersSuccess,
  loadSingleOrder,
  loadSingleOrderSuccess,
  updateOrder,
  updateOrderSuccess,
} from './orders.actions';
import { OrdersService } from './orders.service';

@Injectable()
export class OrdersEffects {
  loadOrders$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadOrders),
      exhaustMap(({ customerId }) =>
        this._ordersService.getOrders(customerId).pipe(
          map((ordersResponse) => loadOrdersSuccess(ordersResponse)),
          catchError(dispatchErrorAction),
        ),
      ),
    ),
  );

  loadSingleOrder$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadSingleOrder),
      exhaustMap(({ orderId, customerId }) => {
        return this._ordersService.getSingleOrder(orderId, customerId).pipe(
          map((singleOrderResponse) => loadSingleOrderSuccess(singleOrderResponse)),
          catchError(dispatchErrorAction),
        );
      }),
    ),
  );

  createOrder$ = createEffect(() =>
    this._actions$.pipe(
      ofType(createOrder),
      exhaustMap(({ newOrder, customerId }) =>
        this._ordersService.createOrder(newOrder, customerId).pipe(
          map((newOrderResponse) => {
            return createOrderSuccess(newOrderResponse);
          }),
          catchError(dispatchErrorAction),
        ),
      ),
    ),
  );

  updateOrder$ = createEffect(() =>
    this._actions$.pipe(
      ofType(updateOrder),
      exhaustMap((payload) =>
        this._ordersService.updateOrder(payload).pipe(
          map((singleOrderResponse) => updateOrderSuccess(singleOrderResponse)),
          catchError(dispatchErrorAction),
        ),
      ),
    ),
  );

  deleteOrder$ = createEffect(() =>
    this._actions$.pipe(
      ofType(deleteOrder),
      exhaustMap(({ orderId, customerId }) =>
        this._ordersService.deleteOrder(orderId, customerId).pipe(
          map((deletedOrderResponse) => deleteOrderSuccess(deletedOrderResponse)),
          catchError(dispatchErrorAction),
        ),
      ),
    ),
  );

  constructor(private _actions$: Actions, private _ordersService: OrdersService) {}
}
