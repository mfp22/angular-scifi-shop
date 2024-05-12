import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAccount } from '@scifi/account/account.feature';
import { Customer } from '@scifi/account/customer.type';
import { Status } from '@scifi/http';
import { selectCartItemsCount, selectLoadStatus } from '@scifi/ngrx/cart/cart.feature';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.sass'],
})
export class CartPageComponent {
  readonly loadStatus$: Observable<Status> = this._store.select(selectLoadStatus);
  readonly cartItemsCount$: Observable<number | undefined> =
    this._store.select(selectCartItemsCount);
  readonly accountData$: Observable<Customer | null> = this._store.select(selectAccount);

  constructor(private _store: Store) {}

  ngOnInit() {
    window.scrollTo({ top: 0 });
  }

  get lightModeEnabled() {
    return document.body.classList.contains('light-mode');
  }
}
