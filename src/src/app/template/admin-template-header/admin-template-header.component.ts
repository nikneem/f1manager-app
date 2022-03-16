import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { playerLogout } from '@state/player/player-actions';
import { userLogout } from '@state/user/user-actions';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'f1-admin-template-header',
  templateUrl: './admin-template-header.component.html',
  styleUrls: ['./admin-template-header.component.scss'],
})
export class AdminTemplateHeaderComponent implements OnInit, OnDestroy {
  public isLoggedIn: boolean = false;
  private isLoggedinSubscription: Subscription | null = null;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private cookieService: CookieService
  ) {}

  login() {}

  changepass() {
    this.router.navigate(['/user/changepassword']);
  }

  logout() {
    this.cookieService.delete('f1mgr-refresh-token');
    this.store.dispatch(userLogout());
    setTimeout(() => {
      window.location.href = '/';
    }, 500);
  }

  ngOnInit(): void {
    this.isLoggedinSubscription = this.store
      .select((str) => str.userState.isLoggedOn)
      .subscribe((state) => {
        this.isLoggedIn = state;
      });
  }
  ngOnDestroy(): void {
    if (this.isLoggedinSubscription) {
      this.isLoggedinSubscription.unsubscribe();
    }
  }
}
