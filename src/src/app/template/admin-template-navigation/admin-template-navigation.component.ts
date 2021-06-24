import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'f1-admin-template-navigation',
  templateUrl: './admin-template-navigation.component.html',
  styleUrls: ['./admin-template-navigation.component.scss'],
})
export class AdminTemplateNavigationComponent implements OnInit, OnDestroy {
  public isAdministrator: boolean = false;
  public isLoggedIn: boolean = false;

  private userChangedSubscription?: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.userChangedSubscription = this.store
      .select((str) => str.userState)
      .subscribe((val) => {
        if (val) {
          this.isLoggedIn = val.isLoggedOn;
          this.isAdministrator = val.isAdministrator;
        }
      });
  }
  ngOnDestroy(): void {
    if (this.userChangedSubscription) {
      this.userChangedSubscription.unsubscribe();
    }
  }
}
