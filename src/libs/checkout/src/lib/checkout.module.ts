import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout/checkout.component';
import { MaterialModule } from '@scifi/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgLetModule } from 'ng-let';
import { NgxStripeModule } from 'ngx-stripe';
import { PaymentComponent } from './payment/payment.component';
import { SpinnerModule } from '@scifi/spinner/spinner.module';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { OrderItemsComponent } from './order-items/order-items.component';
import { RouterModule } from '@angular/router';
import { AccountModule } from '@scifi/account/account.module';

@NgModule({
  declarations: [CheckoutComponent, PaymentComponent, OrderItemsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgLetModule,
    RouterModule,
    SpinnerModule,
    ClipboardModule,
    NgxStripeModule.forRoot(import.meta.env.NG_APP_STRIPE_KEY),
    AccountModule,
  ],
})
export class CheckoutModule {}
