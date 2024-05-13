import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ChipsComponent } from '@scifi/chips/chips.component';
import { MaterialModule } from '@scifi/material/material.module';
import { SpinnerModule } from '@scifi/spinner/spinner.module';
import { NgLetModule } from 'ng-let';
import { AppRoutingModule } from '../../../../app/app-routing.module';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CartSidebarComponent } from './cart-sidebar/cart-sidebar.component';
import { CartEffects } from './cart.effects';
import { cartFeature } from './cart.feature';
import { CartComponent } from './cart/cart.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    NgLetModule,
    AppRoutingModule,
    SpinnerModule,
    ChipsComponent,
    StoreModule.forFeature(cartFeature),
    EffectsModule.forFeature(CartEffects),
  ],
  declarations: [CartComponent, CartSidebarComponent, CartPageComponent],
  exports: [CartSidebarComponent],
})
export class CartModule {}
