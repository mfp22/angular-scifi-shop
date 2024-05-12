import { isDevMode } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { of } from 'rxjs';
import { authReducer } from './auth/auth.feature';
import { cartReducer } from './cart/cart.feature';
import { categoriesReducer } from './categories/categories.feature';
import { httpError } from './notification/notification.actions';
import { notificationReducer } from './notification/notification.feature';
import { accountReducer } from '@scifi/account/account.feature';
import { ApiError } from '@scifi/http';
import { AuthState, CartState, CategoriesState, NotificationState } from '@scifi/types';
import { AccountState } from '@scifi/account/account.state';

export type AppState = {
  authSlice: AuthState;
  accountSlice: AccountState;
  categoriesSlice: CategoriesState;
  cartSlice: CartState;
  notificationSlice: NotificationState;
};

export const reducers: ActionReducerMap<AppState> = {
  authSlice: authReducer,
  accountSlice: accountReducer,
  cartSlice: cartReducer,
  notificationSlice: notificationReducer,
  categoriesSlice: categoriesReducer,
};

// log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    //console.log('state', state);
    //console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [debug] : [];

export const dispatchErrorAction = ({ error }: { error: ApiError }) => of(httpError(error));
