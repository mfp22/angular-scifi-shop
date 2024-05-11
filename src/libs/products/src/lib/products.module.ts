import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from '../../../../app/ngrx/products/products.effects';
import { MaterialModule } from '@scifi/material/material.module';
import { SpinnerModule } from '@scifi/spinner/spinner.module';
import { RouterModule } from '@angular/router';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { FormsModule } from '@angular/forms';
import { SingleProductComponent } from './single-product/single-product.component';
import { StoreModule } from '@ngrx/store';
import { productsFeature } from '../../../../app/ngrx/products/products.feature';
import { ActionButtonsComponent } from './action-buttons/action-buttons.component';
import { NgLetModule } from 'ng-let';
import { ReviewsModule } from '@scifi/reviews/reviews.module';
import { ProductsPaginationComponent } from './products-pagination/products-pagination.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { wishlistFeature } from '../../../../app/ngrx/wishlist/wishlist.feature';
import { WishlistEffects } from '../../../../app/ngrx/wishlist/wishlist.effects';
import { FavoritesComponent } from './favorites/favorites.component';
import { reviewsFeature } from '../../../../app/ngrx/reviews/reviews.feature';
import { ReviewsEffects } from '../../../../app/ngrx/reviews/reviews.effects';
import { ChipsComponent } from '@scifi/chips/chips.component';
import { PageNotFoundComponent } from '@scifi/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    ProductListComponent, 
    ProductDialogComponent, 
    SingleProductComponent, 
    ActionButtonsComponent,
    ProductsPaginationComponent,
    FavoritesComponent
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
    EffectsModule.forFeature(WishlistEffects)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductsModule { }
