import { SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAccount } from './account.feature';
import { AuthCredentials } from './auth-credentials.type';
import { authenticateWithSSO } from './auth.actions';
import { selectLoggedInUserId } from './auth.feature';
import { Customer } from './customer.type';
import { OAuthCredentials } from './oauth-credentials.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _baseUrl = 'https://taliphus.vercel.app/api';
  private _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    observe: 'response' as const,
    withCredentials: true,
  };
  public loggedInUserId: string | number | null = null;
  public accountData: Customer | null = null;

  constructor(private _http: HttpClient, private _store: Store) {
    _store.select(selectLoggedInUserId).subscribe((id) => {
      this.loggedInUserId = id;
    });

    _store.select(selectAccount).subscribe((accountData) => {
      this.accountData = accountData;
    });
  }

  loginOrSignup(requestBody: AuthCredentials, endpoint: '/login' | '/signup') {
    const response = this._http.post<{ customer: Customer }>(
      this._baseUrl + endpoint,
      requestBody,
      this._httpOptions,
    );

    return response;
  }

  authenticateWithSSO(requestBody: OAuthCredentials) {
    const response = this._http.post<{ customer: Customer }>(
      this._baseUrl + '/sso',
      requestBody,
      this._httpOptions,
    );

    return response;
  }

  dispatchSocialLoginAction(user: SocialUser) {
    this._store.dispatch(
      authenticateWithSSO({
        requestBody: {
          name: user.name,
          email: user.email,
          authId: user.id,
          provider: `${user.provider[0].toUpperCase()}${user.provider.slice(1).toLowerCase()}`,
          thumbnail: user.photoUrl,
        },
        socialUser: user,
      }),
    );
  }

  logout() {
    const response = this._http.post<{ msg: string }>(
      this._baseUrl + '/logout',
      {},
      { withCredentials: true },
    );

    return response;
  }
}
