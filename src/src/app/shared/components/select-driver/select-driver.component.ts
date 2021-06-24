import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { driverGetAvailable } from '@state/driver/driver-actions';
import { DriverDto } from '@state/driver/driver-models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'f1-select-driver',
  templateUrl: './select-driver.component.html',
  styleUrls: ['./select-driver.component.scss'],
})
export class SelectDriverComponent implements OnInit, OnDestroy {
  private loadingSubscription?: Subscription;
  private errorMessageSubscription?: Subscription;
  private driversListSubscription?: Subscription;

  public isLoading: boolean = false;
  public errorMessage?: string;
  public drivers?: Array<DriverDto>;
  public selectedDriver: DriverDto | undefined;

  constructor(private store: Store<AppState>) {}

  selectDriver(driver: DriverDto) {
    this.selectedDriver = driver;
  }
  ngOnInit(): void {
    this.loadingSubscription = this.store
      .select((str) => str.driverState.isLoading)
      .subscribe((val) => (this.isLoading = val));
    this.errorMessageSubscription = this.store
      .select((str) => str.driverState.errorMessage)
      .subscribe((val) => (this.errorMessage = val));
    this.driversListSubscription = this.store
      .select((str) => str.driverState.activeDrivers)
      .subscribe((val) => (this.drivers = val));

    this.store.dispatch(driverGetAvailable());
  }
  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
    if (this.errorMessageSubscription) {
      this.errorMessageSubscription.unsubscribe();
    }
    if (this.driversListSubscription) {
      this.driversListSubscription.unsubscribe();
    }
  }
}
