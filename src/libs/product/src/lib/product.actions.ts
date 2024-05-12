import { createAction, props } from '@ngrx/store';
import { ExpressCheckoutItem } from './product.type';

export const addExpressCheckoutItemFromDialog = createAction(
  '[Product Dialog] Add Express Checkout Item',
  props<ExpressCheckoutItem>(),
);
