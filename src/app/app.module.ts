import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgLetModule } from 'ng-let';

import { reducers, metaReducers } from '@scifi/ngrx/index';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from '@scifi/material/material.module';
import { AuthModule } from '@scifi/auth/auth.module';
import { AppComponent } from './app.component';
import { HomeComponent } from '@scifi/home/home.component';
import { NavComponent } from '@scifi/nav/nav.component';
import { AccountModule } from '@scifi/account/account.module';
import { DialogComponent } from '@scifi/dialog/dialog.component';
import { CartModule } from '@scifi/cart/cart.module';
import { CheckoutModule } from '@scifi/checkout/checkout.module';
import { accountFeature } from '@scifi/account/account.feature';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { notificationFeature } from '@scifi/ngrx/notification/notification.feature';
import { categoriesFeature } from '@scifi/ngrx/categories/categories.feature';
import { CategoriesEffects } from '@scifi/ngrx/categories/categories.effects';
import { SearchComponent } from '@scifi/search/search.component';
import { FooterComponent } from '@scifi/footer/footer.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NavComponent, DialogComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    AuthModule,
    AccountModule,
    CartModule,
    CheckoutModule,
    MaterialModule,
    SearchComponent,
    NgLetModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreModule.forFeature(categoriesFeature),
    StoreModule.forFeature(accountFeature),
    StoreModule.forFeature(notificationFeature),
    EffectsModule.forFeature(CategoriesEffects),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    FooterComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
