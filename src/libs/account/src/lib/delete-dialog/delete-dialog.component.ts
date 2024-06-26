import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Status } from '@scifi/http';
import { Observable, Subscription } from 'rxjs';
import { deleteUser, resetStatus } from '../account.actions';
import { selectDeleteStatus } from '../account.feature';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.sass'],
})
export class DeleteDialogComponent implements OnInit, OnDestroy {
  readonly $deleteStatus: Observable<Status> = this._store.select(selectDeleteStatus);
  public deleteStatus: Status = 'pending';
  private _socialLoginUser: SocialUser | undefined;
  private _subscription = Subscription.EMPTY;
  private _socialLoginSubscription = Subscription.EMPTY;

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    private _store: Store,
    private _authService: SocialAuthService,
    @Inject(MAT_DIALOG_DATA) public data: { customerId: number },
  ) {}

  ngOnInit() {
    this._subscription = this.$deleteStatus.subscribe((deleteStatus) => {
      this.deleteStatus = deleteStatus;
      if (deleteStatus === 'success') {
        this.dialogRef.close();
      }
    });

    this._socialLoginSubscription = this._authService.authState.subscribe((user) => {
      if (user) {
        this._socialLoginUser = user;
      }
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  deleteAccount() {
    this._store.dispatch(
      deleteUser({
        customerId: this.data.customerId,
      }),
    );
    if (this._socialLoginUser) {
      this._authService.signOut();
    }
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
    this._socialLoginSubscription.unsubscribe();
    this._store.dispatch(resetStatus());
  }
}
