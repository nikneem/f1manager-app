import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '@components/confirmation-dialog/confirmation-dialog.component';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { DriverDetailsDialogComponent } from '@pages/admin/drivers/dialogs/driver-details-dialog/driver-details-dialog.component';
import { AppState } from '@state/app.state';
import {
  driverDelete,
  driverUndelete,
  driverGetList,
} from '@state/driver/driver-actions';
import { DriverDto } from '@state/driver/driver-models';
import {
  engineDelete,
  engineGetList,
  engineUndelete,
} from '@state/engine/engine-actions';
import { EngineDto } from '@state/engine/engine-models';
import { Subscription } from 'rxjs';
import { EngineDetailsDialogComponent } from '../../dialogs/engine-details-dialog/engine-details-dialog.component';

@Component({
  selector: 'f1-engines-list-page',
  templateUrl: './engines-list-page.component.html',
  styleUrls: ['./engines-list-page.component.scss'],
})
export class EnginesListPageComponent implements OnInit, OnDestroy {
  private enginesSubscription?: Subscription;
  private enginesFilterSubscription?: Subscription;
  private isLoadingSubscription?: Subscription;

  public engines?: Array<EngineDto>;
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

  createEngine() {
    this.dialog.open(EngineDetailsDialogComponent, {
      width: '80%',
    });
  }
  editEngine(engine: EngineDto) {
    this.dialog.open(EngineDetailsDialogComponent, {
      width: '80%',
      data: { engine: engine },
    });
  }
  deleteEngine(engine: DriverDto) {
    if (engine.id) {
      const engineId: string = engine.id;
      this.translateService
        .get(['admin.engines.delete.title', 'admin.engines.delete.message'], {
          name: engine.name,
        })
        .subscribe((val) => {
          const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
              title: val['admin.engines.delete.title'],
              message: val['admin.engines.delete.message'],
            },
          });
          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              this.store.dispatch(engineDelete({ id: engineId }));
            }
          });
        });
    }
  }
  undeleteEngine(engine: DriverDto) {
    if (engine.id) {
      const engineId: string = engine.id;
      this.translateService
        .get(
          ['admin.engines.undelete.title', 'admin.engines.undelete.message'],
          {
            name: engine.name,
          }
        )
        .subscribe((val) => {
          const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
              title: val['admin.engines.undelete.title'],
              message: val['admin.engines.undelete.message'],
            },
          });
          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              this.store.dispatch(engineUndelete({ id: engineId }));
            }
          });
        });
    }
  }

  ngOnInit(): void {
    this.enginesSubscription = this.store
      .select((str) => str.engineState.engines)
      .subscribe((val) => (this.engines = val));
    this.enginesFilterSubscription = this.store
      .select((str) => str.engineState.filter)
      .subscribe((val) => {
        this.store.dispatch(engineGetList({ payload: val }));
      });
    this.isLoadingSubscription = this.store
      .select((str) => str.engineState.isLoading)
      .subscribe((val) => (this.isLoading = val));
  }
  ngOnDestroy(): void {
    if (this.enginesSubscription) {
      this.enginesSubscription.unsubscribe();
    }
    if (this.enginesFilterSubscription) {
      this.enginesFilterSubscription.unsubscribe();
    }
    if (this.isLoadingSubscription) {
      this.isLoadingSubscription.unsubscribe();
    }
  }
}
