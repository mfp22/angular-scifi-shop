import { isDevMode } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { ApiError, AppState } from '@scifi/types';
import { of } from 'rxjs';
import { accountReducer } from './account/account.feature';
import { authReducer } from './auth/auth.feature';
import { cartReducer } from './cart/cart.feature';
import { categoriesReducer } from './categories/categories.feature';
import { httpError } from './notification/notification.actions';
import { notificationReducer } from './notification/notification.feature';

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
