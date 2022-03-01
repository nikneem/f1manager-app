import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { chassisGetAvailable } from '@state/chassis/chassis-actions';
import { ChassisDto } from '@state/chassis/chassis-models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'f1-select-chassis',
  templateUrl: './select-chassis.component.html',
  styleUrls: ['./select-chassis.component.scss'],
})
export class SelectChassisComponent implements OnInit, OnDestroy {
  private loadingSubscription?: Subscription;
  private errorMessageSubscription?: Subscription;
  private chassisListSubscription?: Subscription;

  public isLoading: boolean = false;
  public errorMessage?: string;
  public chassis?: Array<ChassisDto>;
  public selectedChassis: ChassisDto | undefined;

  constructor(private store: Store<AppState>) {}

  selectChassis(chassis: ChassisDto) {
    this.selectedChassis = chassis;
  }
  ngOnInit(): void {
    this.loadingSubscription = this.store
      .select((str) => str.chassisState.isLoading)
      .subscribe((val) => (this.isLoading = val));
    this.errorMessageSubscription = this.store
      .select((str) => str.chassisState.errorMessage)
      .subscribe((val) => (this.errorMessage = val));
    this.chassisListSubscription = this.store
      .select((str) => str.chassisState.activeChassis)
      .subscribe((val) => {
        this.chassis = val;
      });

    this.store.dispatch(chassisGetAvailable());
  }
  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
    if (this.errorMessageSubscription) {
      this.errorMessageSubscription.unsubscribe();
    }
    if (this.chassisListSubscription) {
      this.chassisListSubscription.unsubscribe();
    }
  }
}
