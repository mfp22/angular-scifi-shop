import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DialogContent } from './dialog-content.type';
import { forceRetry, hideDialog } from './notification.actions';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.sass'],
})
export class DialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Observable<DialogContent>,
    public dialogRef: MatDialogRef<DialogComponent>,
    private _store: Store,
  ) {}

  hideOverlay() {
    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    this._store.dispatch(hideDialog());
  }

  forceRetry() {
    this._store.dispatch(forceRetry());
    window.location.reload();
  }
}
