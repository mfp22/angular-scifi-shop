import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { hideAuthOverlay, resetStatus } from 'src/app/ngrx/auth/auth.actions';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { selectAuthIsLoading, selectAuthIsSuccess, selectLoggedInUserId } from 'src/app/ngrx/auth/auth.feature';
import { AmazonLoginProvider, FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent {
  authIsLoading$: Observable<boolean> = this._store.select(selectAuthIsLoading);
  authIsSuccess$: Observable<boolean> = this._store.select(selectAuthIsSuccess);
  loggedInUserId$: Observable<number | string | null> 
    = this._store.select(selectLoggedInUserId);
  formType = "Login";
  socialUser: SocialUser | undefined;
  private _subscription = Subscription.EMPTY;

  constructor(
    private _store: Store<AppState>,
    private _authService: AuthService,
    private _socialAuthService: SocialAuthService
  ) { }

  ngOnInit() {
    this._subscription = this._socialAuthService.authState.subscribe((user: SocialUser) => {
      this.socialUser = user;
      if (user) {
        this._authService.dispatchSocialLoginAction(user);
      }
    });
  }

  get theme() {
    return document.body.classList.contains("light-mode") ? "outline" : "filled_black";
  }

  get lightModeEnabled() {
    return document.body.classList.contains("light-mode");
  }

  loginWithFacebook() {
    this._socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  loginWithAmazon() {
    this._socialAuthService.signIn(AmazonLoginProvider.PROVIDER_ID);
  }

  tabChange(e: MatTabChangeEvent) {
    switch (e.index) {
      case 0:
        this.formType = "Login";
        break;
      case 1:
        this.formType = "Signup";
        break;
    }
    this._store.dispatch(resetStatus());
  }

  hideOverlay() {
    this._store.dispatch(hideAuthOverlay());
  }

  hideOverlayOnBodyClick(e: MouseEvent) {
    const elementId = (e.target as HTMLElement).id;
    if (elementId === "loginOverlay") {
      this.hideOverlay();
    }
  }

  ngOnDestroy() {
    this._store.dispatch(resetStatus());
    this._subscription.unsubscribe();
  }
}