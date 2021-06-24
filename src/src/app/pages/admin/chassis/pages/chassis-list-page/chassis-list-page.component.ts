import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '@components/confirmation-dialog/confirmation-dialog.component';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from '@state/app.state';
import { chassisDelete, chassisGetList, chassisUndelete } from '@state/chassis/chassis-actions';
import { ChassisDto } from '@state/chassis/chassis-models';
import { Subscription } from 'rxjs';
import { ChassisDetailsDialogComponent } from '../../dialogs/chassis-details-dialog/chassis-details-dialog.component';

@Component({
  selector: 'f1-chassis-list-page',
  templateUrl: './chassis-list-page.component.html',
  styleUrls: ['./chassis-list-page.component.scss']
})
export class ChassisListPageComponent implements OnInit {
  private chassisSubscription?: Subscription;
  private chassisFilterSubscription?: Subscription;
  private isLoadingSubscription?: Subscription;

  public chassis?: Array<ChassisDto>;
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
  ) { }

  createChassis() {
    this.dialog.open(ChassisDetailsDialogComponent, {
      width: '80%'
    });
  }

  editChassis(chassis: ChassisDto) {
    this.dialog.open(ChassisDetailsDialogComponent, {
      width: '80%',
      data: { chassis: chassis }
    })
  }

  deleteChassis(chassis: ChassisDto) {
    if (chassis.id) {
      const chassisId: string = chassis.id;
      this.translateService
        .get(
          ['admin.chassis.delete.title', 'admin.chassis.delete.message'],
          {
            name: chassis.name
          }
        )
        .subscribe((val) => {
          const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
              title: val['admin.chassis.delete.title'],
              message: val['admin.chassis.delete.message'],
            }
          });
          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              this.store.dispatch(chassisDelete({ id: chassisId }));
            }
          })
        });
    }
  }

  undeleteChassis(chassis: ChassisDto) {
    if (chassis.id) {
      const chassisId: string = chassis.id;
      this.translateService
        .get(
          ['admin.chassis.undelete.title', 'admin.chassis.undelete.message'],
          {
            name: chassis.name
          }
        )
        .subscribe((val) => {
          const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
              title: val['admin.chassis.undelete.title'],
              message: val['admin.chassis.undelete.message'],
            }
          });
          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              this.store.dispatch(chassisUndelete({ id: chassisId }));
            }
          })
        });
    }
  }

  ngOnInit(): void {
    this.chassisSubscription = this.store
      .select((str) => str.chassisState.chassis)
      .subscribe((val) => (this.chassis = val));
    this.chassisFilterSubscription = this.store
      .select((str) => str.chassisState.filter)
      .subscribe((val) => {
        this.store.dispatch(chassisGetList({ payload: val }));
      });
    this.isLoadingSubscription = this.store
      .select((str) => str.chassisState.isLoading)
      .subscribe((val) => (this.isLoading = val));
  }

  ngOnDestroy(): void {
    if (this.chassisSubscription) {
      this.chassisSubscription.unsubscribe();
    }

    if (this.chassisFilterSubscription) {
      this.chassisFilterSubscription.unsubscribe();
    }

    if (this.isLoadingSubscription) {
      this.isLoadingSubscription.unsubscribe();
    }
  }

}
