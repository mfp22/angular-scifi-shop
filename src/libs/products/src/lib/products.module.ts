import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ChipsComponent } from '@scifi/chips/chips.component';
import { MaterialModule } from '@scifi/material/material.module';
import { ProductsEffects } from '@scifi/ngrx/products/products.effects';
import { productsFeature } from '@scifi/ngrx/products/products.feature';
import { WishlistEffects } from '@scifi/ngrx/wishlist/wishlist.effects';
import { wishlistFeature } from '@scifi/ngrx/wishlist/wishlist.feature';
import { PageNotFoundComponent } from '@scifi/page-not-found/page-not-found.component';
import { ProductDialogComponent } from '@scifi/product';
import { ReviewsEffects } from '@scifi/reviews/reviews.effects';
import { reviewsFeature } from '@scifi/reviews/reviews.feature';
import { ReviewsModule } from '@scifi/reviews/reviews.module';
import { SpinnerModule } from '@scifi/spinner/spinner.module';
import { NgLetModule } from 'ng-let';
import { ActionButtonsComponent } from './action-buttons/action-buttons.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsPaginationComponent } from './products-pagination/products-pagination.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { authenticationGuard } from '../../../../app/authenticationGuard';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDialogComponent,
    SingleProductComponent,
    ActionButtonsComponent,
    ProductsPaginationComponent,
    FavoritesComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SpinnerModule,
    RouterModule,
    FormsModule,
    NgLetModule,
    ReviewsModule,
    ChipsComponent,
    PageNotFoundComponent,
    StoreModule.forFeature(productsFeature),
    StoreModule.forFeature(reviewsFeature),
    StoreModule.forFeature(wishlistFeature),
    EffectsModule.forFeature(ProductsEffects),
    EffectsModule.forFeature(ReviewsEffects),
    EffectsModule.forFeature(WishlistEffects),
    RouterModule.forChild([
      {
        path: '',
        component: ProductListComponent,
      },
      {
        path: 'favorites',
        title: 'My favorites',
        component: FavoritesComponent,
        canActivate: [authenticationGuard],
      },
      {
        path: ':id',
        component: SingleProductComponent,
      },
    ]),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductsModule {}
