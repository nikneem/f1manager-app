import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from '@state/app.state';
import {
  driverCreate,
  driverCreateSuccess,
  driverUpdate,
  driverUpdateSuccess,
} from '@state/driver/driver-actions';
import { DriverDto } from '@state/driver/driver-models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'f1-driver-details-dialog',
  templateUrl: './driver-details-dialog.component.html',
  styleUrls: ['./driver-details-dialog.component.scss'],
})
export class DriverDetailsDialogComponent implements OnInit, OnDestroy {
  public driver: DriverDto;
  public driverForm?: FormGroup;
  public isLoading: boolean = false;
  private isLoadingSubscription?: Subscription;
  private errorMessageSubscription?: Subscription;
  private createdSuccessSubscription?: Subscription;
  private updatedSuccessSubscription?: Subscription;

  constructor(
    public dialogRef: MatDialogRef<DriverDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { driver: DriverDto } | undefined,
    private store: Store<AppState>,
    private updates$: Actions,
    private translateService: TranslateService,
    private snackBar: MatSnackBar
  ) {
    this.driver =
      data?.driver ??
      new DriverDto({
        isAvailable: true,
        isDeleted: false,
        value: 20000000,
      });
  }

  fileUploaded(filename: string) {
    this.driverForm?.patchValue({ pictureUrl: filename });
    this.driverForm?.controls['pictureUrl'].markAsDirty();
  }

  save() {
    if (this.driverForm?.pristine) {
      this.dialogRef.close();
      return;
    }
    if (this.driverForm?.valid) {
      const driverModel = new DriverDto(this.driverForm?.value);
      if (!driverModel.id) {
        this.store.dispatch(driverCreate({ payload: driverModel }));
      } else {
        this.store.dispatch(
          driverUpdate({ id: driverModel.id, payload: driverModel })
        );
      }
    }
  }

  initializeForm() {
    this.driverForm = new FormGroup({
      id: new FormControl(this.driver.id),
      name: new FormControl(this.driver.name, [Validators.required]),
      country: new FormControl(this.driver.country, [Validators.required]),
      dateOfBirth: new FormControl(this.driver.dateOfBirth, [
        Validators.required,
      ]),
      pictureUrl: new FormControl(this.driver.pictureUrl),
      value: new FormControl(this.driver.value, [Validators.required]),
      activeFrom: new FormControl(this.driver.activeFrom, [
        Validators.required,
      ]),
      activeTo: new FormControl(this.driver.activeTo),
      isAvailable: new FormControl(this.driver.isAvailable),
      isDeleted: new FormControl(this.driver.isDeleted),
    });
  }

  ngOnInit(): void {
    this.initializeForm();

    this.isLoadingSubscription = this.store
      .select((str) => str.driverState.isLoading)
      .subscribe((val) => (this.isLoading = val));
    this.errorMessageSubscription = this.store
      .select((str) => str.driverState.errorMessage)
      .subscribe((val) => {
        if (val) {
          this.translateService.get(val).subscribe((msg) => {
            this.snackBar.open(msg, undefined, { duration: 5000 });
          });
        }
      });

    this.createdSuccessSubscription = this.updates$
      .pipe(ofType(driverCreateSuccess))
      .subscribe(() => {
        this.dialogRef.close();
      });
    this.updatedSuccessSubscription = this.updates$
      .pipe(ofType(driverUpdateSuccess))
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
