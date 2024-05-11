import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addExpressCheckoutItem } from '@scifi/ngrx/orders/orders.actions';
import { AppState, Product } from '@scifi/types';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.sass'],
})
export class ProductDialogComponent {
  quantity: number = 1;

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product },
    private _store: Store<AppState>,
    private _router: Router
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  goToCheckout() {
    this._store.dispatch(
      addExpressCheckoutItem({
        product: this.data.product,
        quantity: this.quantity,
      })
    );
    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(() => {
      this._router.navigate(['/checkout']);
    });
  }
}
