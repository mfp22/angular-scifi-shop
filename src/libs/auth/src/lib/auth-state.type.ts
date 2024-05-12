import { SocialUser } from '@abacritt/angularx-social-login';
import { Customer } from '@scifi/account/customer.type';
import { Status } from '@scifi/http';

export type AuthState = {
  showOverlay: boolean;
  currentUser: Customer | null;
  loggedInUserId: number | string | null;
  loginStatus: Status;
  logoutStatus: Status;
  signupStatus: Status;
  logoutMsg: string | null;
  socialUser: SocialUser | null;
};
