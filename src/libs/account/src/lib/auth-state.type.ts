import { SocialUser } from '@abacritt/angularx-social-login';
import { Status } from '@scifi/http';
import { Customer } from './customer.type';

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
