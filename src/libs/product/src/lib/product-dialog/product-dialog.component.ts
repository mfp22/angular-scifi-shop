import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from '../product.type';
import { addExpressCheckoutItemFromDialog } from '../product.actions';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.sass'],
})
export class ProductDialogComponent {
  quantity = 1;

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product },
    private _store: Store,
    private _router: Router,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  goToCheckout() {
    this._store.dispatch(
      addExpressCheckoutItemFromDialog({
        product: this.data.product,
        quantity: this.quantity,
      }),
    );
    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(() => {
      this._router.navigate(['/checkout']);
    });
  }
}
