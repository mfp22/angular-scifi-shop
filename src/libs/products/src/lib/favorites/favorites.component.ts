import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAccount } from '@scifi/account/account.feature';
import { Customer } from '@scifi/account/customer.type';
import { Status } from '@scifi/http';
import { Review } from '@scifi/reviews/review.type';
import { loadFavorites } from '@scifi/reviews/reviews.actions';
import { selectFavorites, selectLoadStatus } from '@scifi/reviews/reviews.feature';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.sass'],
})
export class FavoritesComponent {
  loadStatus$: Observable<Status> = this._store.select(selectLoadStatus);
  favorites$: Observable<Review[] | [] | null> = this._store.select(selectFavorites);
  accountData$: Observable<Customer | null> = this._store.select(selectAccount);
  private _subscription = Subscription.EMPTY;
  public showDescription: { [productId: number]: boolean } = {};

  constructor(private _store: Store) {}

  ngOnInit() {
    this._subscription = this.accountData$.subscribe((customer) => {
      if (customer?.id) {
        this._store.dispatch(loadFavorites({ customerId: customer.id }));
      }
    });
  }

  get lightModeEnabled() {
    return document.body.classList.contains('light-mode');
  }

  toggleDescription(productId: number, show: boolean) {
    this.showDescription[productId] = show;
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
