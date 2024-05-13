import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectLoggedInUserId } from '@scifi/account/auth.feature';
import { Category, Supplier, selectCategories, selectSuppliers } from '@scifi/category';
import { Status } from '@scifi/http';
import {
  selectActiveId as selectActiveCartId,
  selectUpdateStatus as selectCartUpdateStatus,
} from '@scifi/ngrx/cart/cart.feature';
import { resetWishlistStatus } from '@scifi/ngrx/wishlist/wishlist.actions';
import {
  selectActiveId as selectActiveWishlistId,
  selectWishlist,
  selectUpdateStatus as selectWishlistUpdateStatus,
} from '@scifi/ngrx/wishlist/wishlist.feature';
import { Pagination } from '@scifi/pagination';
import { Product } from '@scifi/product';
import { Wishlist } from '@scifi/types';
import { WishlistService } from '@scifi/wishlist/wishlist.service';
import { Observable, Subscription, combineLatest, map } from 'rxjs';
import { selectLoadStatus, selectPagination, selectProducts } from '../products.feature';

const placeholderProduct = {
  id: 2,
  name: 'Short-range thermal sensors',
  numOfTimesOrdered: 12,
  totalUnitsOrdered: 29,
  numOfReviews: 7,
  averageRating: '3.14',
  description:
    '8-pack of thermal sensors, each with a 10-m radius and 30 second duration. Useful for inconspicuously tracking heat signatures within a small radius.',
  price: '236',
  stock: 39,
  categoryName: 'Components',
  supplierName: 'G & B Supplies',
  thumbnail: 'blank.png',
};

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollRef') scrollRef: ElementRef | undefined;
  loggedInUserId$: Observable<string | number | null> = this._store.select(selectLoggedInUserId);
  wishlist$: Observable<Wishlist | null> = this._store.select(selectWishlist);
  products$: Observable<Product[] | null> = this._store.select(selectProducts);
  categories$: Observable<Category[] | null> = this._store.select(selectCategories);
  suppliers$: Observable<Supplier[] | null> = this._store.select(selectSuppliers);
  pagination$: Observable<Pagination> = this._store.select(selectPagination);
  productLoadStatus$: Observable<Status> = this._store.select(selectLoadStatus);
  cartUpdateStatus$: Observable<Status> = this._store.select(selectCartUpdateStatus);
  wishlistUpdateStatus$: Observable<Status> = this._store.select(selectWishlistUpdateStatus);
  cartActiveId$: Observable<number> = this._store.select(selectActiveCartId);
  wishlistActiveId$: Observable<number> = this._store.select(selectActiveWishlistId);
  private _breakpointSubscription = Subscription.EMPTY;
  private _streamSubscription = Subscription.EMPTY;
  private _productsSubscription = Subscription.EMPTY;
  listDisplayStyle = 'grid';
  showDisplayToggle = true;
  searchTerm: string | null = null;
  placeholderProducts: Product[] = [];
  private _wishlistOperation: 'add' | 'remove' | undefined;
  category: Category | null | undefined = null;
  supplier: Supplier | null | undefined = null;
  datastream$ = combineLatest([
    this.categories$,
    this.suppliers$,
    this._route.queryParamMap,
    this.wishlistUpdateStatus$,
  ]).pipe(
    map(([categories, suppliers, queryParamMap, wishlistUpdateStatus]) => ({
      categories,
      suppliers,
      queryParamMap,
      wishlistUpdateStatus,
    })),
  );

  constructor(
    private _store: Store,
    private _route: ActivatedRoute,
    private _router: Router,
    private _breakPointObserver: BreakpointObserver,
    private _snackBar: MatSnackBar,
    private _wishlistService: WishlistService,
  ) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0 });
    this._breakpointSubscription = this._breakPointObserver
      .observe('(max-width: 880px)')
      .subscribe(({ matches }) => {
        if (matches) {
          this.listDisplayStyle = 'grid';
          this.showDisplayToggle = false;
        } else {
          this.showDisplayToggle = true;
        }
      });

    this.placeholderProducts = Array(25)
      .fill(0)
      .map(() => placeholderProduct);

    this._streamSubscription = this.datastream$.subscribe(
      ({ categories, suppliers, queryParamMap, wishlistUpdateStatus }) => {
        this.searchTerm = queryParamMap.get('product');
        const categoryParam = queryParamMap.get('category');
        const supplierParam = queryParamMap.get('supplier');
        if (categoryParam && categories) {
          this.category = categories.find((category) => category.name === categoryParam);
        } else if (!categoryParam) {
          this.category = null;
        }

        if (supplierParam && suppliers) {
          this.supplier = suppliers.find((supplier) => supplier.name === supplierParam);
        } else if (!supplierParam) {
          this.supplier = null;
        }

        if (wishlistUpdateStatus === 'success') {
          const message =
            this._wishlistOperation === 'add'
              ? 'Product successfully added to wishlist.'
              : 'Product successfully removed from wishlist.';
          this._snackBar.open(message, 'Dismiss', {
            horizontalPosition: 'start',
            verticalPosition: 'top',
            duration: 8000,
          });
          this._store.dispatch(resetWishlistStatus());
        }
      },
    );
  }

  ngAfterViewInit(): void {
    this._productsSubscription = this.products$.subscribe(() => {
      if (this.scrollRef) {
        document.querySelector('main')!.scrollIntoView();
        window.scrollBy(0, -100);
      }
    });
  }

  get headerImageSrc() {
    return this.category
      ? `assets/categories/${this.category.thumbnail}.svg`
      : this.supplier
      ? `assets/suppliers/${this.supplier.thumbnail}.svg`
      : 'assets/products.svg';
  }

  get productListClass() {
    return {
      'product-list': this.listDisplayStyle === 'list',
      'product-grid': this.listDisplayStyle === 'grid',
    };
  }

  get lightModeEnabled() {
    return document.body.classList.contains('light-mode');
  }

  productImgSrc(product: Product) {
    return `assets/icons/${this.lightModeEnabled ? 'transparent' : 'black'}/${product.thumbnail}`;
  }

  reloadResults() {
    this._router.navigate([]);
  }

  productIsInWishlist(productId: number, wishlist: Wishlist) {
    return wishlist.wishlistItems.find((item) => item.product.id === productId);
  }

  updateWishlist(operation: 'add' | 'remove', wishlist: Wishlist, productId: number) {
    this._wishlistOperation = operation;
    this._wishlistService.dispatchWishlistActions(operation, wishlist, productId);
  }

  toggleStyle(e: MatButtonToggleChange) {
    this.listDisplayStyle = e.value;
  }

  ngOnDestroy() {
    this._breakpointSubscription.unsubscribe();
    this._streamSubscription.unsubscribe();
    this._productsSubscription.unsubscribe();
  }
}
