import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from '@state/app.state';
import {
  baseTeamCreate,
  baseTeamCreateSuccess,
  baseTeamUpdate,
  baseTeamUpdateSuccess,
} from '@state/base-team/base-team-actions';
import { BaseTeamDto } from '@state/base-team/base-team-models';
import { chassisGetAvailable } from '@state/chassis/chassis-actions';
import { ChassisDto } from '@state/chassis/chassis-models';
import { driverGetAvailable } from '@state/driver/driver-actions';
import { DriverDto } from '@state/driver/driver-models';
import { engineGetAvailable } from '@state/engine/engine-actions';
import { EngineDto } from '@state/engine/engine-models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'f1-base-team-details-dialog',
  templateUrl: './base-team-details-dialog.component.html',
  styleUrls: ['./base-team-details-dialog.component.scss'],
})
export class BaseTeamDetailsDialogComponent implements OnInit, OnDestroy {
  private baseTeam: BaseTeamDto;
  public baseTeamForm?: FormGroup;
  public isLoading: boolean = false;
  private isLoadingSubscription?: Subscription;
  private errorMessageSubscription?: Subscription;
  private createdSuccessSubscription?: Subscription;
  private updatedSuccessSubscription?: Subscription;
  private availableDriversSubscription?: Subscription;
  private availableEnginesSubscription?: Subscription;
  private availableChassisSubscription?: Subscription;

  availableDrivers?: Array<DriverDto>;
  availableEngines?: Array<EngineDto>;
  availableChassises?: Array<ChassisDto>;

  constructor(
    public dialogRef: MatDialogRef<BaseTeamDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { driver: BaseTeamDto } | undefined,
    private store: Store<AppState>,
    private updates$: Actions,
    private translateService: TranslateService,
    private snackBar: MatSnackBar
  ) {
    this.baseTeam = data?.driver ?? new BaseTeamDto({});
  }

  save() {
    if (this.baseTeamForm?.pristine) {
      this.dialogRef.close();
      return;
    }
    if (this.baseTeamForm?.valid) {
      const baseTeamModel = new BaseTeamDto(this.baseTeamForm?.value);
      if (!baseTeamModel.id) {
        this.store.dispatch(baseTeamCreate({ payload: baseTeamModel }));
      } else {
        this.store.dispatch(
          baseTeamUpdate({ id: baseTeamModel.id, payload: baseTeamModel })
        );
      }
    }
  }

  initializeForm() {
    this.baseTeamForm = new FormGroup({
      id: new FormControl(this.baseTeam.id),
      name: new FormControl(this.baseTeam.name, [Validators.required]),
      origin: new FormControl(this.baseTeam.origin, [Validators.required]),
      principal: new FormControl(this.baseTeam.principal, [
        Validators.required,
      ]),
      firstDriverId: new FormControl(this.baseTeam.firstDriverId, [
        Validators.required,
      ]),
      secondDriverId: new FormControl(this.baseTeam.secondDriverId, [
        Validators.required,
      ]),
      engineId: new FormControl(this.baseTeam.engineId, [Validators.required]),
      chassisId: new FormControl(this.baseTeam.chassisId, [
        Validators.required,
      ]),
    });
  }

  ngOnInit(): void {
    this.initializeForm();

    this.isLoadingSubscription = this.store
      .select((str) => str.baseTeamState.isLoading)
      .subscribe((val) => (this.isLoading = val));
    this.errorMessageSubscription = this.store
      .select((str) => str.baseTeamState.errorMessage)
      .subscribe((val) => {
        if (val) {
          this.translateService.get(val).subscribe((msg) => {
            this.snackBar.open(msg, undefined, { duration: 5000 });
          });
        }
      });

    this.createdSuccessSubscription = this.updates$
      .pipe(ofType(baseTeamCreateSuccess))
      .subscribe(() => {
        this.dialogRef.close();
      });
    this.updatedSuccessSubscription = this.updates$
      .pipe(ofType(baseTeamUpdateSuccess))
      .subscribe(() => {
        this.dialogRef.close();
      });

    this.availableDriversSubscription = this.store
      .select((str) => str.driverState.activeDrivers)
      .subscribe((val) => (this.availableDrivers = val));
    this.availableEnginesSubscription = this.store
      .select((str) => str.engineState.engines)
      .subscribe((val) => (this.availableEngines = val));
    this.availableChassisSubscription = this.store
      .select((str) => str.chassisState.chassis)
      .subscribe((val) => (this.availableChassises = val));

    this.store.dispatch(driverGetAvailable());
    this.store.dispatch(engineGetAvailable());
    this.store.dispatch(chassisGetAvailable());
  }
  ngOnDestroy(): void {
    if (this.createdSuccessSubscription) {
      this.createdSuccessSubscription.unsubscribe();
    }
    if (this.updatedSuccessSubscription) {
      this.updatedSuccessSubscription.unsubscribe();
    }
    if (this.isLoadingSubscription) {
      this.isLoadingSubscription.unsubscribe();
    }
    if (this.errorMessageSubscription) {
      this.errorMessageSubscription.unsubscribe();
    }
    if (this.availableDriversSubscription) {
      this.availableDriversSubscription.unsubscribe();
    }
    if (this.availableEnginesSubscription) {
      this.availableEnginesSubscription.unsubscribe();
    }
    if (this.availableChassisSubscription) {
      this.availableChassisSubscription.unsubscribe();
    }
  }
}
