import { isDevMode } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AccountState } from '@scifi/account/account-state.type';
import { accountReducer } from '@scifi/account/account.feature';
import { AuthState } from '@scifi/auth/auth-state.type';
import { authReducer } from '@scifi/auth/auth.feature';
import { NotificationState, notificationReducer } from '@scifi/dialog/notification.feature';
import { CartState, CategoriesState } from '@scifi/types';
import { cartReducer } from './cart/cart.feature';
import { categoriesReducer } from './categories/categories.feature';

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
