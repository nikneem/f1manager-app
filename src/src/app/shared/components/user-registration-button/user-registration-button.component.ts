import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationDialogComponent } from '@components/user-registration-dialog/user-registration-dialog.component';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'f1-user-registration-button',
  templateUrl: './user-registration-button.component.html',
  styleUrls: ['./user-registration-button.component.scss'],
})
export class UserRegistrationButtonComponent implements OnInit {
  private loginSubscription?: Subscription;
  public isLoggedIn = false;
  constructor(private dialog: MatDialog, private store: Store<AppState>) {}

  register() {
    this.dialog.open(UserRegistrationDialogComponent, {
      width: '40%',
    });
  }

  ngOnInit(): void {
    this.loginSubscription = this.store
      .select((str) => str.userState.isLoggedOn)
      .subscribe((val) => (this.isLoggedIn = val));
  }
  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
