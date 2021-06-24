import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from '@state/app.state';
import {
  chassisCreate,
  chassisCreateSuccess,
  chassisUpdate,
  chassisUpdateSuccess,
} from '@state/chassis/chassis-actions';
import { ChassisDto } from '@state/chassis/chassis-models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'f1-chassis-details-dialog',
  templateUrl: './chassis-details-dialog.component.html',
  styleUrls: ['./chassis-details-dialog.component.scss']
})
export class ChassisDetailsDialogComponent implements OnInit, OnDestroy {
  private chassis: ChassisDto;
  public chassisForm?: FormGroup;
  public isLoading: boolean = false;
  private isLoadingSubscription?: Subscription;
  private errorMessageSubscription?: Subscription;
  private createdSuccessSubscription?: Subscription;
  private updatedSuccessSubscription?: Subscription;

  constructor(
    public dialogRef: MatDialogRef<ChassisDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { chassis: ChassisDto } | undefined,
    private store: Store<AppState>,
    private updates$: Actions,
    private translateService: TranslateService,
    private snackBar: MatSnackBar
  ) {
    this.chassis =
      data?.chassis ??
      new ChassisDto({
        isAvailable: true,
        isDeleted: false,
        currentValue: 20000000,
      });
  }

  save() {
    if (this.chassisForm?.pristine) {
      this.dialogRef.close();
      return;
    }
    if (this.chassisForm?.valid) {
      const chassisModel = new ChassisDto(this.chassisForm?.value);
      if (!chassisModel.id) {
        this.store.dispatch(chassisCreate({ payload: chassisModel }));
      } else {
        this.store.dispatch(
          chassisUpdate({ id: chassisModel.id, payload: chassisModel })
        );
      }
    }
  }

  initializeForm() {
    this.chassisForm = new FormGroup({
      id: new FormControl(this.chassis.id),
      name: new FormControl(this.chassis.name, [Validators.required]),
      weeklyWearOutPercentage: new FormControl(this.chassis.weeklyWearOutPercentage, [
        Validators.required,
      ]),
      maxWearOutPercentage: new FormControl(this.chassis.maxWearOutPercentage, [
        Validators.required,
      ]),
      pictureUrl: new FormControl(this.chassis.pictureUrl, [
        Validators.required,
      ]),
      currentValue: new FormControl(this.chassis.currentValue, [
        Validators.required,
      ]),
      activeFrom: new FormControl(this.chassis.activeFrom, [
        Validators.required,
      ]),
      activeUntil: new FormControl(this.chassis.activeUntil),
      isAvailable: new FormControl(this.chassis.isAvailable),
      isDeleted: new FormControl(this.chassis.isDeleted),
    });
  }

  ngOnInit(): void {
    this.initializeForm();

    this.isLoadingSubscription = this.store
      .select((str) => str.chassisState.isLoading)
      .subscribe((val) => (this.isLoading = val));
    this.errorMessageSubscription = this.store
      .select((str) => str.chassisState.errorMessage)
      .subscribe((val) => {
        if (val) {
          this.translateService.get(val).subscribe((msg) => {
            this.snackBar.open(msg, undefined, { duration: 5000 });
          });
        }
      });

    this.createdSuccessSubscription = this.updates$
      .pipe(ofType(chassisCreateSuccess))
      .subscribe(() => {
        this.dialogRef.close();
      });
    this.updatedSuccessSubscription = this.updates$
      .pipe(ofType(chassisUpdateSuccess))
      .subscribe(() => {
        this.dialogRef.close();
      });
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
  }
}
