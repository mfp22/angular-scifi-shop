import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';
import { EffectsModule } from '@ngrx/effects';
import { AddressesComponent } from './addresses/addresses.component';
import { MaterialModule } from '@scifi/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgLetModule } from 'ng-let';
import { CheckoutModule } from '@scifi/checkout/checkout.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { AccountEffects } from './account.effects';

@NgModule({
  declarations: [AccountComponent, AddressesComponent, DeleteDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    NgLetModule,
    CheckoutModule,
    EffectsModule.forFeature(AccountEffects),
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { subscriptSizing: 'dynamic' },
    },
  ],
  exports: [AddressesComponent],
})
export class AccountModule {}
