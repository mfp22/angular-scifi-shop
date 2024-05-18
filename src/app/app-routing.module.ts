import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@scifi/home/home.component';
import { AccountComponent } from '@scifi/account/account/account.component';
import { CheckoutComponent } from '@scifi/checkout/checkout/checkout.component';
import { PageNotFoundComponent } from '@scifi/page-not-found/page-not-found.component';
import { CartPageComponent } from '@scifi/cart/cart-page/cart-page.component';
import { authenticationGuard } from './authenticationGuard';

const routes: Routes = [
  {
    path: '',
    title: "Boom's Black Market",
    component: HomeComponent,
  },
  {
    path: 'counter',
    title: 'Counter',
    loadChildren: () => import('@scifi/counter').then((m) => m.CounterModule),
  },
  {
    path: 'products',
    loadChildren: () => import('@scifi/products/products.module').then((m) => m.ProductsModule),
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
    loadChildren: () => import('@scifi/wishlist/wishlist.module').then((m) => m.WishlistModule),
  },
  {
    path: 'reviews',
    loadChildren: () => import('@scifi/reviews/reviews.module').then((m) => m.ReviewsModule),
  },
  {
    path: 'orders',
    loadChildren: () => import('@scifi/orders/orders.module').then((m) => m.OrdersModule),
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
