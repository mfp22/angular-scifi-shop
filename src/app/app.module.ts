import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgLetModule } from 'ng-let';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { accountFeature } from '@scifi/account/account.feature';
import { AccountModule } from '@scifi/account/account.module';
import { AuthModule } from '@scifi/account/auth.module';
import { CartModule } from '@scifi/cart/cart.module';
import { CategoriesEffects, categoriesFeature } from '@scifi/category';
import { CheckoutModule } from '@scifi/checkout/checkout.module';
import { DialogComponent } from '@scifi/dialog/dialog.component';
import { notificationFeature } from '@scifi/dialog/notification.feature';
import { FooterComponent } from '@scifi/footer/footer.component';
import { HomeComponent } from '@scifi/home/home.component';
import { MaterialModule } from '@scifi/material/material.module';
import { NavComponent } from '@scifi/nav/nav.component';
import { SearchComponent } from '@scifi/search/search.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { metaReducers, reducers } from './app.reducer';

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
