import { BreakpointObserver } from '@angular/cdk/layout';
import { formatCurrency } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  LOCALE_ID,
  OnInit,
  Output,
  SimpleChange,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { selectAccount } from '@scifi/account/account.feature';
import { Customer } from '@scifi/account/customer.type';
import { Address } from '@scifi/address';
import { notify } from '@scifi/dialog/notification.actions';
import { selectCartTotal } from '@scifi/ngrx/cart/cart.feature';
import { selectExpressCheckoutItem } from '@scifi/orders/orders.feature';
import { ExpressCheckoutItem } from '@scifi/product';
import { PaymentEvent } from '@scifi/types';
import {
  Appearance,
  PaymentIntentResult,
  StripeElementsOptions,
  StripePaymentElementChangeEvent,
  StripePaymentElementOptions,
} from '@stripe/stripe-js';
import { StripePaymentElementComponent, StripeService } from 'ngx-stripe';
import { Observable, Subscription, combineLatest, map, shareReplay } from 'rxjs';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.sass'],
})
export class PaymentComponent implements OnInit {
  @ViewChild(StripePaymentElementComponent)
  paymentElement: StripePaymentElementComponent | undefined;
  @Input() billingAddress: Address | null | undefined;
  @Input() shippingAddress: Address | null | undefined;
  @Input() newOrderId: number | undefined;
  @Output() paymentEvent = new EventEmitter<PaymentEvent>();
  private readonly _accountData$: Observable<Customer | null> = this._store.select(selectAccount);
  private readonly _cartTotal$: Observable<number> = this._store.select(selectCartTotal);
  private readonly _expressCheckoutItem$: Observable<ExpressCheckoutItem | null> =
    this._store.select(selectExpressCheckoutItem);
  private _accountDataSubscription = Subscription.EMPTY;
  private _checkoutSubscription = Subscription.EMPTY;
  private _paymentSubscription = Subscription.EMPTY;
  private readonly _dataStream$ = combineLatest([
    this._cartTotal$,
    this._expressCheckoutItem$,
  ]).pipe(
    map(([cartTotal, expressCheckoutItem]) => {
      return { cartTotal, expressCheckoutItem };
    }),
  );
  smallViewport$: Observable<boolean> = this._breakpointObserver.observe('(max-width: 500px)').pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  orderTotal = 0;
  elementsOptions: StripeElementsOptions = { locale: 'en' };
  paymentElementOptions: StripePaymentElementOptions = {
    business: { name: "Boom's Black Market" },
    defaultValues: {},
  };
  paymentMethod: 'Card' | 'Klarna' | 'PayPal' | undefined;
  paying = false;
  status = '';

  paymentElementForm = this._formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email]],
  });

  lightAppearance: Appearance = {
    theme: 'stripe',
    labels: 'floating',
    variables: {
      colorPrimary: '#9c27b0',
    },
  };

  darkAppearance: Appearance = {
    theme: 'night',
    labels: 'floating',
    variables: {
      colorPrimary: '#18ffff',
      colorBackground: '#424242',
      colorDanger: 'orange',
    },
  };

  testCardNumbers = [
    {
      type: 'Visa',
      number: '4000 0082 6000 0000',
      detail: 'valid',
      color: 'green',
    },
    {
      type: 'Visa (debit)',
      number: '4000 0582 6000 0005',
      detail: 'valid',
      color: 'green',
    },
    {
      type: 'Mastercard',
      number: '5555 5582 6555 4449',
      detail: 'valid',
      color: 'green',
    },
    {
      type: 'Visa',
      number: '4000 0000 0000 9995',
      detail: 'fail payment',
      color: 'red',
    },
    {
      type: 'Visa',
      number: '4000 0025 0000 3155',
      detail: 'requires authentication',
      color: '#c56607',
    },
  ];

  get lightModeEnabled() {
    return document.body.classList.contains('light-mode');
  }

  constructor(
    private _checkoutService: CheckoutService,
    private _formBuilder: FormBuilder,
    private _stripeService: StripeService,
    private _store: Store,
    private _snackBar: MatSnackBar,
    private _breakpointObserver: BreakpointObserver,
    @Inject(LOCALE_ID) private locale: string,
  ) {}

  ngOnInit() {
    this.status = 'loading';
    this._accountDataSubscription = this._accountData$.subscribe((accountData) => {
      if (accountData) {
        this.paymentElementForm.patchValue({
          name: accountData.name,
          email: accountData.email || '',
        });

        this.paymentElementOptions.defaultValues = {
          billingDetails: {
            name: accountData.name,
            email: accountData.email,
          },
        };
      }
    });

    this._checkoutSubscription = this._dataStream$.subscribe(
      ({ cartTotal, expressCheckoutItem }) => {
        if (cartTotal || expressCheckoutItem) {
          if (cartTotal) {
            this.orderTotal = cartTotal;
          }
          if (expressCheckoutItem) {
            this.orderTotal =
              Number(expressCheckoutItem.product.price) * expressCheckoutItem.quantity;
          }

          this._checkoutService
            .createPaymentIntent(Math.round(this.orderTotal * 100))
            .subscribe(({ paymentIntent }) => {
              this.status = 'success';
              this.elementsOptions.clientSecret = paymentIntent.client_secret!;
            });
        }
      },
    );
  }

  handlePaymentMethodChange(e: StripePaymentElementChangeEvent) {
    switch (e.value.type) {
      case 'card':
        this.paymentMethod = 'Card';
        break;
      case 'paypal':
        this.paymentMethod = 'PayPal';
        break;
      case 'klarna':
        this.paymentMethod = 'Klarna';
        break;
    }
  }

  pay() {
    if (!this.shippingAddress || !this.billingAddress) {
      this._store.dispatch(
        notify({
          title: 'Address information is missing.',
          content: 'Billing and shipping addresses are required to complete your order.',
        }),
      );
    } else {
      this.paying = true;
      if (this.paymentMethod !== 'Card') {
        this.processNonCardPayment();
      } else if (this.paymentElementForm.valid) {
        this.processCardPayment();
      }
    }
  }

  processCardPayment() {
    this._paymentSubscription = this._stripeService
      .confirmPayment({
        elements: this.paymentElement!.elements,
        redirect: 'if_required',
      })
      .subscribe((result: PaymentIntentResult) => {
        this.paying = false;
        if (result.error) {
          // Show error to the customer (e.g., insufficient funds)
          this._store.dispatch(
            notify({
              title: 'There was an error with the payment process.',
              content: result.error.message || 'Unable to process your request.',
            }),
          );
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to the customer
            this._store.dispatch(
              notify({
                title: 'Payment successful.',
                content: `All done! Order total: ${formatCurrency(
                  this.orderTotal,
                  this.locale,
                  '£',
                )}. You will now be redirected to your new order.`,
              }),
            );
            this.paymentEvent.emit({
              status: 'completed',
              paymentMethod: 'Card',
              total: this.orderTotal,
            });
          }
        }
      });
  }

  processNonCardPayment() {
    this.paymentEvent.emit({
      status: 'pending',
      paymentMethod: this.paymentMethod!,
      total: this.orderTotal,
    });
  }

  ngOnChanges({ newOrderId }: { newOrderId: SimpleChange }) {
    if (newOrderId?.currentValue) {
      if (this.paymentMethod === 'PayPal') {
        this._paymentSubscription = this._stripeService
          .confirmPayPalPayment(this.elementsOptions.clientSecret!, {
            return_url: `${window.location.origin}/orders/new?order_id=${this.newOrderId}&payment_method=PayPal`,
          })
          .subscribe(() => {
            this.paying = false;
          });
      } else if (this.paymentMethod === 'Klarna') {
        this._paymentSubscription = this._stripeService
          .confirmKlarnaPayment(this.elementsOptions.clientSecret!, {
            payment_method: {
              billing_details: {
                address: {
                  country: 'GB',
                },
                email: 'user-gb@example.com',
                phone: '01895808666',
              },
            },
            return_url: `${window.location.origin}/orders/new?order_id=${this.newOrderId}&payment_method=Klarna`,
          })
          .subscribe(() => {
            this.paying = false;
          });
      }
    }
  }

  getErrorMessage() {
    const messages = { nameError: '', emailError: '' };
    if (this.paymentElementForm.controls.name.hasError('required')) {
      messages.nameError = 'You must enter a name.';
    }
    if (this.paymentElementForm.controls.email.hasError('email')) {
      messages.emailError = 'Email address must be valid.';
    }
    return messages;
  }

  copyCardNumber(cardNumber: string) {
    this._snackBar.open(`Copied to clipboard: ${cardNumber}.`, 'Dimiss', {
      horizontalPosition: 'start',
      verticalPosition: 'top',
      duration: 8000,
    });
  }

  ngOnDestroy() {
    this._accountDataSubscription.unsubscribe();
    this._checkoutSubscription.unsubscribe();
    this._paymentSubscription.unsubscribe();
  }
}
