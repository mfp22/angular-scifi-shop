import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import {
  createOrUpdateAddress,
  createOrUpdateAddressSuccess,
  deleteAddress,
  deleteAddressSuccess,
  deleteUser,
  deleteUserSuccess,
  loadAccount,
  loadAccountFailure,
  loadAccountSuccess,
  updateAccount,
  updateAccountSuccess,
} from './account.actions';
import { AccountService } from '..';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { dispatchErrorAction } from '@scifi/ngrx/index';

@Injectable()
export class AccountEffects {
  loadAccount$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadAccount),
      exhaustMap(({ customerId }) =>
        this._accountService.getAccountData(customerId).pipe(
          map((accountResponse) => {
            return loadAccountSuccess(accountResponse);
          }),
          catchError(() => {
            window.localStorage.removeItem('userId');
            return of(loadAccountFailure());
          }),
        ),
      ),
    ),
  );

  updateAccount$ = createEffect(() =>
    this._actions$.pipe(
      ofType(updateAccount),
      exhaustMap(({ requestBody, customerId }) => {
        return this._accountService.updateAccount(requestBody, customerId).pipe(
          map((accountResponse) => {
            return updateAccountSuccess(accountResponse);
          }),
          catchError(dispatchErrorAction),
        );
      }),
    ),
  );

  createOrUpdateAddress$ = createEffect(() =>
    this._actions$.pipe(
      ofType(createOrUpdateAddress),
      exhaustMap(({ requestBody, customerId }) => {
        return this._accountService.createOrUpdateAddress(requestBody, customerId).pipe(
          map((response) => {
            return createOrUpdateAddressSuccess(response);
          }),
          catchError(dispatchErrorAction),
        );
      }),
    ),
  );

  deleteAddress$ = createEffect(() =>
    this._actions$.pipe(
      ofType(deleteAddress),
      exhaustMap(({ addressId, addressIdType, customerId }) => {
        return this._accountService.deleteAddress(addressId, addressIdType, customerId).pipe(
          map((response) => deleteAddressSuccess(response)),
          catchError(dispatchErrorAction),
        );
      }),
    ),
  );

  deleteUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(deleteUser),
      exhaustMap(({ customerId }) => {
        return this._accountService.deleteAccount(customerId).pipe(
          map((deleteUserResponse) => {
            return deleteUserSuccess(deleteUserResponse);
          }),
          catchError(dispatchErrorAction),
        );
      }),
    ),
  );

  deleteUserNotification$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(deleteUserSuccess),
        map((payload) => {
          window.localStorage.removeItem('userId');
          this._router.navigate(['/']);
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private _actions$: Actions,
    private _router: Router,
    private _accountService: AccountService,
  ) {}
}
