import { CommonModule } from '@angular/common';
import { inject, NgModule } from '@angular/core';
import { CanActivateFn, Router, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AccountModule } from '@scifi/account/account.module';
import { AuthService } from '@scifi/account/auth.service';
import { MaterialModule } from '@scifi/material/material.module';
import { PageNotFoundComponent } from '@scifi/page-not-found/page-not-found.component';
import { SpinnerModule } from '@scifi/spinner/spinner.module';
import { NgLetModule } from 'ng-let';
import { NewOrderRedirectComponent } from './new-order-redirect/new-order-redirect.component';
import { OrdersEffects } from './orders.effects';
import { ordersFeature } from './orders.feature';
import { OrdersComponent } from './orders/orders.component';
import { SingleOrderComponent } from './single-order/single-order.component';
import { authenticationGuard } from '../../../../app/authenticationGuard';

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
    PageNotFoundComponent,
    StoreModule.forFeature(ordersFeature),
    EffectsModule.forFeature(OrdersEffects),
  ],
})
export class OrdersModule {}
