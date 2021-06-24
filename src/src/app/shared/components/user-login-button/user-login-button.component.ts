import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginDialogComponent } from '@components/user-login-dialog/user-login-dialog.component';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'f1-user-login-button',
  templateUrl: './user-login-button.component.html',
  styleUrls: ['./user-login-button.component.scss'],
})
export class UserLoginButtonComponent implements OnInit, OnDestroy {
  private loginSubscription?: Subscription;
  public isLoggedIn = false;
  constructor(private dialog: MatDialog, private store: Store<AppState>) {}
  login() {
    this.dialog.open(UserLoginDialogComponent, {
      width: '20%',
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
