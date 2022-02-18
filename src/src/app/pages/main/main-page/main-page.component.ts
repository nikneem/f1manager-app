import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'f1-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  public isLoggedIn: boolean = false;
  private loggedInSubscription?: Subscription;
  constructor(private router: Router, private store: Store<AppState>) {}

  login() {}

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  ngOnInit(): void {
    this.loggedInSubscription = this.store
      .select((str) => str.userState.isLoggedOn)
      .subscribe((val) => (this.isLoggedIn = val));
  }
  ngOnDestroy(): void {
    if (this.loggedInSubscription) {
      this.loggedInSubscription.unsubscribe();
    }
  }
}
