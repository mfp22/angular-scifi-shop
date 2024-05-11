import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '@scifi/auth/auth.service';
import { ApiError, Customer } from '@scifi/types';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { clearCurrentUser } from '../account/account.actions';
import { httpError, notify } from '../notification/notification.actions';
import {
  authenticateWithSSO,
  authenticateWithSSOSuccess,
  loginRequest,
  loginSuccess,
  logoutRequest,
  logoutSuccess,
  signupRequest,
  signupSuccess,
} from './auth.actions';

@Injectable()
export class AuthEffects {
  private _socialLoginUser: SocialUser | undefined;

  loginOrSignup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginRequest, signupRequest),
      exhaustMap(({ requestBody, endpoint }) => {
        return this.authService.loginOrSignup(requestBody, endpoint).pipe(
          map((response) => {
            const res = response.body as { customer: Customer };
            window.localStorage.setItem('userId', String(res.customer.id));
            return endpoint === '/login'
              ? loginSuccess(res)
              : signupSuccess(res);
          }),
          catchError(({ error }: { error: ApiError }) => of(httpError(error)))
        );
      })
    )
  );

  authenticateWithSSO$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticateWithSSO),
      exhaustMap(({ requestBody }) => {
        return this.authService.authenticateWithSSO(requestBody).pipe(
          map((response) => {
            const res = response.body as { customer: Customer };
            window.localStorage.setItem('userId', String(res.customer.id));
            return authenticateWithSSOSuccess(res);
          }),
          catchError(({ error }: { error: ApiError }) => of(httpError(error)))
        );
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutRequest),
      exhaustMap(() => {
        window.localStorage.removeItem('userId');
        if (this._socialLoginUser) {
          this._authService.signOut();
        }
        return this.authService.logout().pipe(
          map((logoutResponse) => {
            this.router.navigate(['/']);
            return logoutSuccess(logoutResponse);
          }),
          catchError(({ error }: { error: ApiError }) => of(httpError(error)))
        );
      })
    )
  );

  logoutNotification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutSuccess),
      map((payload) =>
        notify({ title: 'Successfully logged out.', content: payload.msg })
      )
    )
  );

  clearCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutSuccess),
      map(() => clearCurrentUser())
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private _authService: SocialAuthService
  ) {
    this._authService.authState.subscribe((user) => {
      if (user) {
        this._socialLoginUser = user;
      }
    });
  }
}
