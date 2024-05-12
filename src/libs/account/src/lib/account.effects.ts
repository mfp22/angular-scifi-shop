import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { dispatchErrorAction } from '@scifi/dialog/notification.actions';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AccountService } from '..';
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
        map(() => {
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
