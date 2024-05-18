import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '@scifi/product';
import { WishlistBasic } from './wishlist-basic.type';
import { WishlistItem } from './wishlist-item.type';
import { resetWishlistStatus, updateActiveId, updateWishlist } from './wishlist.actions';
import { Wishlist } from './wishlist.type';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  baseUrl = 'https://taliphus.vercel.app/api/customers';

  constructor(private _http: HttpClient, private _store: Store) {}

  getWishlistItems(customerId: number, format: string) {
    const options = {
      params: new HttpParams().append('format', format),
      withCredentials: true,
    };

    return this._http.get<{ wishlist: Wishlist }>(
      `${this.baseUrl}/${customerId}/wishlist`,
      options,
    );
  }

  updateWishlist(updatedWishlist: WishlistBasic, customerId: number) {
    return this._http.put<{ wishlist: Wishlist | [] }>(
      `${this.baseUrl}/${customerId}/wishlist`,
      updatedWishlist,
      { withCredentials: true },
    );
  }

  dispatchWishlistActions(
    operation: 'add' | 'remove' | 'removeAll',
    wishlist: Wishlist,
    productId: number,
  ): void {
    this._store.dispatch(resetWishlistStatus());

    if (operation === 'removeAll') {
      this._store.dispatch(updateActiveId({ activeId: -1 }));
      this._store.dispatch(
        updateWishlist({
          updatedWishlist: [],
          customerId: wishlist.id,
        }),
      );
      return;
    }

    this._store.dispatch(updateActiveId({ activeId: productId }));
    let wishlistArray: WishlistItem[] | [] = [];
    const transformWishlistArray = (item: { product: Product }) => ({
      customerId: wishlist.id,
      productId: item.product.id,
    });

    if (operation === 'add') {
      wishlistArray = wishlist.wishlistItems.map(transformWishlistArray);
      wishlistArray.unshift({ customerId: wishlist.id, productId });
    } else {
      wishlistArray = wishlist.wishlistItems
        .filter((item) => item.product.id !== productId)
        .map(transformWishlistArray);
    }

    this._store.dispatch(
      updateWishlist({
        updatedWishlist: wishlistArray,
        customerId: wishlist.id,
      }),
    );
  }
}
