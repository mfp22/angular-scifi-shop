import { inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import { MaterialModule } from '@scifi/material/material.module';
import { StoreModule } from '@ngrx/store';
import { ordersFeature } from '@scifi/ngrx/orders/orders.feature';
import { EffectsModule } from '@ngrx/effects';
import { OrdersEffects } from '@scifi/ngrx/orders/orders.effects';
import { SpinnerModule } from '@scifi/spinner/spinner.module';
import { SingleOrderComponent } from './single-order/single-order.component';
import { CanActivateFn, Router, RouterModule } from '@angular/router';
import { NewOrderRedirectComponent } from './new-order-redirect/new-order-redirect.component';
import { NgLetModule } from 'ng-let';
import { AccountModule } from '@scifi/account/account.module';
import { ReviewsModule } from '@scifi/reviews/reviews.module';
import { PageNotFoundComponent } from '@scifi/page-not-found/page-not-found.component';
import { authenticationGuard } from '../../../../app/authenticationGuard';
import { AuthService } from '@scifi/auth/auth.service';

const newOrderGuard: CanActivateFn = () => {
  const loggedInUserId = inject(AuthService).loggedInUserId;
  if (!loggedInUserId) {
    return inject(Router).createUrlTree(['/']);
  } else {
    return true;
  }
};

@NgModule({
  declarations: [OrdersComponent, SingleOrderComponent, NewOrderRedirectComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NgLetModule,
    SpinnerModule,
    RouterModule.forChild([
      {
        path: '',
        title: 'My orders',
        component: OrdersComponent,
      },
      {
        path: 'new',
        title: 'New order',
        component: NewOrderRedirectComponent,
        canActivate: [newOrderGuard],
      },
      {
        path: ':id',
        title: 'Single order',
        component: SingleOrderComponent,
        canActivate: [authenticationGuard],
      },
    ]),
    AccountModule,
    ReviewsModule,
    PageNotFoundComponent,
    StoreModule.forFeature(ordersFeature),
    EffectsModule.forFeature(OrdersEffects),
  ],
})
export class OrdersModule {}
