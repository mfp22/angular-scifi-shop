import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ChipsComponent } from '@scifi/chips/chips.component';
import { MaterialModule } from '@scifi/material/material.module';
import { SpinnerModule } from '@scifi/spinner/spinner.module';
import { NgLetModule } from 'ng-let';
import { AppRoutingModule } from '../../../../app/app-routing.module';
import { WishlistEffects } from './wishlist.effects';
import { wishlistFeature } from './wishlist.feature';
import { WishlistComponent } from './wishlist/wishlist.component';

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
