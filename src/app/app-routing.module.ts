import { inject, NgModule } from '@angular/core';
import { CanActivateFn, Router, RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from '@scifi/products/product-list/product-list.component';
import { HomeComponent } from '@scifi/home/home.component';
import { AccountComponent } from '@scifi/account/account/account.component';
import { CheckoutComponent } from '@scifi/checkout/checkout/checkout.component';
import { OrdersComponent } from '@scifi/orders/orders/orders.component';
import { SingleOrderComponent } from '@scifi/orders/single-order/single-order.component';
import { PageNotFoundComponent } from '@scifi/page-not-found/page-not-found.component';
import { NewOrderRedirectComponent } from '@scifi/orders/new-order-redirect/new-order-redirect.component';
import { SingleProductComponent } from '@scifi/products/single-product/single-product.component';
import { WishlistComponent } from '@scifi/wishlist/wishlist/wishlist.component';
import { CartPageComponent } from '@scifi/cart/cart-page/cart-page.component';
import { FavoritesComponent } from '@scifi/products/favorites/favorites.component';
import { ReviewsPageComponent } from '@scifi/reviews/reviews-page/reviews-page.component';
import { AuthService } from '@scifi/auth/auth.service';

const authenticationGuard: CanActivateFn = () => {
  const customerAccount = inject(AuthService).accountData;
  if (!customerAccount) {
    return inject(Router).createUrlTree(['/']);
  } else {
    return true;
  }
};

const newOrderGuard: CanActivateFn = () => {
  const loggedInUserId = inject(AuthService).loggedInUserId;
  if (!loggedInUserId) {
    return inject(Router).createUrlTree(['/']);
  } else {
    return true;
  }
};

const routes: Routes = [
  {
    path: '',
    title: "Boom's Black Market",
    component: HomeComponent,
  },
  {
    path: 'products',
    component: ProductListComponent,
  },
  {
    path: 'products/:id',
    component: SingleProductComponent,
  },
  {
    path: 'account',
    title: 'My account',
    component: AccountComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'cart',
    title: 'My cart',
    component: CartPageComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'wishlist',
    title: 'My wishlist',
    component: WishlistComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'favorites',
    title: 'My favorites',
    component: FavoritesComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'reviews',
    title: 'Product reviews',
    component: ReviewsPageComponent,
  },
  {
    path: 'orders',
    title: 'My orders',
    component: OrdersComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'orders/new',
    title: 'New order',
    component: NewOrderRedirectComponent,
    canActivate: [newOrderGuard],
  },
  {
    path: 'orders/:id',
    title: 'Single order',
    component: SingleOrderComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'checkout',
    title: 'Checkout',
    component: CheckoutComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: '**',
    title: 'Not found',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
