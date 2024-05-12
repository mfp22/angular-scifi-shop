import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '@scifi/material/material.module';
import { NgLetModule } from 'ng-let';
import { AccountEffects } from './account.effects';
import { AccountComponent } from './account/account.component';
import { AddressStepComponent } from './address-step/address-step.component';
import { AddressesComponent } from './addresses/addresses.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [AccountComponent, AddressesComponent, AddressStepComponent, DeleteDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    NgLetModule,
    EffectsModule.forFeature(AccountEffects),
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { subscriptSizing: 'dynamic' },
    },
  ],
  exports: [AddressesComponent, AddressStepComponent],
})
export class AccountModule {}
