import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '@components/confirmation-dialog/confirmation-dialog.component';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from '@state/app.state';
import {
  driverDelete,
  driverGetList,
  driverUndelete,
} from '@state/driver/driver-actions';
import { DriverDto, DriverListFilterDto } from '@state/driver/driver-models';
import { Subscription } from 'rxjs';
import { DriverDetailsDialogComponent } from '../../dialogs/driver-details-dialog/driver-details-dialog.component';

@Component({
  selector: 'f1-driver-list-page',
  templateUrl: './driver-list-page.component.html',
  styleUrls: ['./driver-list-page.component.scss'],
})
export class DriverListPageComponent implements OnInit, OnDestroy {
  private driversSubscription?: Subscription;
  private driversFilterSubscription?: Subscription;
  private isLoadingSubscription?: Subscription;

  public drivers?: Array<DriverDto>;
  public isLoading = false;

  displayedColumns: string[] = [
    'name',
    'value',
    'activeFrom',
    'activeTo',
    'isAvailable',
    'actions',
  ];

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private translateService: TranslateService
  ) {}

  createDriver() {
    this.dialog.open(DriverDetailsDialogComponent, {
      width: '80%',
    });
  }
  editDriver(driver: DriverDto) {
    this.dialog.open(DriverDetailsDialogComponent, {
      width: '80%',
      data: { driver: driver },
    });
  }
  deleteDriver(driver: DriverDto) {
    if (driver.id) {
      const driverId: string = driver.id;
      this.translateService
        .get(['admin.drivers.delete.title', 'admin.drivers.delete.message'], {
          name: driver.name,
        })
        .subscribe((val) => {
          const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
              title: val['admin.drivers.delete.title'],
              message: val['admin.drivers.delete.message'],
            },
          });
          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              this.store.dispatch(driverDelete({ id: driverId }));
            }
          });
        });
    }
  }
  undeleteDriver(driver: DriverDto) {
    if (driver.id) {
      const driverId: string = driver.id;
      this.translateService
        .get(
          ['admin.drivers.undelete.title', 'admin.drivers.undelete.message'],
          {
            name: driver.name,
          }
        )
        .subscribe((val) => {
          const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
              title: val['admin.drivers.undelete.title'],
              message: val['admin.drivers.undelete.message'],
            },
          });
          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              this.store.dispatch(driverUndelete({ id: driverId }));
            }
          });
        });
    }
  }

  ngOnInit(): void {
    this.driversSubscription = this.store
      .select((str) => str.driverState.drivers)
      .subscribe((val) => (this.drivers = val));
    this.driversFilterSubscription = this.store
      .select((str) => str.driverState.filter)
      .subscribe((val) => {
        this.store.dispatch(driverGetList({ payload: val }));
      });
    this.isLoadingSubscription = this.store
      .select((str) => str.driverState.isLoading)
      .subscribe((val) => (this.isLoading = val));
  }
  ngOnDestroy(): void {
    if (this.driversSubscription) {
      this.driversSubscription.unsubscribe();
    }
    if (this.driversFilterSubscription) {
      this.driversFilterSubscription.unsubscribe();
    }
    if (this.isLoadingSubscription) {
      this.isLoadingSubscription.unsubscribe();
    }
  }
}
