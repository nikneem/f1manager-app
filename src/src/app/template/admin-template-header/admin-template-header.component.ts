import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { playerLogout } from '@state/player/player-actions';
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
    private router: Router
  ) {}

  login() {
  }

  logout() {
  }

  ngOnInit(): void {
    this.isLoggedinSubscription = this.store
      .select((str) => str.playerState)
      .subscribe((state) => {
        this.isLoggedIn = state ? state.isLoggedOn : false;
      });
  }
  ngOnDestroy(): void {
    if (this.isLoggedinSubscription) {
      this.isLoggedinSubscription.unsubscribe();
    }
  }
}
