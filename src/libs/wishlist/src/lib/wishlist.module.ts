import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistComponent } from './wishlist/wishlist.component';
import { StoreModule } from '@ngrx/store';
import { wishlistFeature } from '@scifi/ngrx/wishlist/wishlist.feature';
import { EffectsModule } from '@ngrx/effects';
import { WishlistEffects } from '@scifi/ngrx/wishlist/wishlist.effects';
import { MaterialModule } from '@scifi/material/material.module';
import { SpinnerModule } from '@scifi/spinner/spinner.module';
import { NgLetModule } from 'ng-let';
import { AppRoutingModule } from '../../../../app/app-routing.module';
import { ChipsComponent } from '@scifi/chips/chips.component';

@NgModule({
  declarations: [WishlistComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SpinnerModule,
    NgLetModule,
    ChipsComponent,
    AppRoutingModule,
    StoreModule.forFeature(wishlistFeature),
    EffectsModule.forFeature(WishlistEffects),
  ],
})
export class WishlistModule {}
