import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import { MaterialModule } from '@scifi/material/material.module';
import { StoreModule } from '@ngrx/store';
import { ordersFeature } from '@scifi/ngrx/orders/orders.feature';
import { EffectsModule } from '@ngrx/effects';
import { OrdersEffects } from '@scifi/ngrx/orders/orders.effects';
import { SpinnerModule } from '@scifi/spinner/spinner.module';
import { SingleOrderComponent } from './single-order/single-order.component';
import { RouterModule } from '@angular/router';
import { NewOrderRedirectComponent } from './new-order-redirect/new-order-redirect.component';
import { NgLetModule } from 'ng-let';
import { AccountModule } from '@scifi/account/account.module';
import { ReviewsModule } from '@scifi/reviews/reviews.module';
import { PageNotFoundComponent } from '@scifi/page-not-found/page-not-found.component';

@NgModule({
  declarations: [OrdersComponent, SingleOrderComponent, NewOrderRedirectComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NgLetModule,
    SpinnerModule,
    RouterModule,
    AccountModule,
    ReviewsModule,
    PageNotFoundComponent,
    StoreModule.forFeature(ordersFeature),
    EffectsModule.forFeature(OrdersEffects),
  ],
})
export class OrdersModule {}
