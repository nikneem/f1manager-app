import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'f1-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  public isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  login() {}

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
