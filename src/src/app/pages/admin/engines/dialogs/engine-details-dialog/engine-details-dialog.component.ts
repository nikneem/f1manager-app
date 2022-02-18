import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from '@state/app.state';
import {
  engineCreate,
  engineCreateSuccess,
  engineUpdate,
  engineUpdateSuccess,
} from '@state/engine/engine-actions';
import { EngineDto } from '@state/engine/engine-models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'f1-engine-details-dialog',
  templateUrl: './engine-details-dialog.component.html',
  styleUrls: ['./engine-details-dialog.component.scss'],
})
export class EngineDetailsDialogComponent implements OnInit, OnDestroy {
  public engine: EngineDto;
  public engineForm?: FormGroup;
  public isLoading: boolean = false;
  private isLoadingSubscription?: Subscription;
  private errorMessageSubscription?: Subscription;
  private createdSuccessSubscription?: Subscription;
  private updatedSuccessSubscription?: Subscription;

  constructor(
    public dialogRef: MatDialogRef<EngineDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { engine: EngineDto } | undefined,
    private store: Store<AppState>,
    private updates$: Actions,
    private translateService: TranslateService,
    private snackBar: MatSnackBar
  ) {
    this.engine =
      data?.engine ??
      new EngineDto({
        isAvailable: true,
        isDeleted: false,
        value: 20000000,
      });
  }

  fileUploaded(filename: string) {
    this.engineForm?.patchValue({ pictureUrl: filename });
    this.engineForm?.controls['pictureUrl'].markAsDirty();
  }

  save() {
    if (this.engineForm?.pristine) {
      this.dialogRef.close();
      return;
    }
    if (this.engineForm?.valid) {
      const engineModel = new EngineDto(this.engineForm?.value);
      if (!engineModel.id) {
        this.store.dispatch(engineCreate({ payload: engineModel }));
      } else {
        this.store.dispatch(
          engineUpdate({ id: engineModel.id, payload: engineModel })
        );
      }
    }
  }

  initializeForm() {
    this.engineForm = new FormGroup({
      id: new FormControl(this.engine.id),
      name: new FormControl(this.engine.name, [Validators.required]),
      manufacturer: new FormControl(this.engine.manufacturer, [
        Validators.required,
      ]),
      model: new FormControl(this.engine.model, [Validators.required]),
      activeFrom: new FormControl(this.engine.activeFrom, [
        Validators.required,
      ]),
      activeUntil: new FormControl(this.engine.activeUntil),
      pictureUrl: new FormControl(this.engine.pictureUrl),
      value: new FormControl(this.engine.value, [Validators.required]),
      weeklyWearOff: new FormControl(this.engine.weeklyWearOff),
      maxWearOff: new FormControl(this.engine.maxWearOff),
      isAvailable: new FormControl(this.engine.isAvailable),
      isDeleted: new FormControl(this.engine.isDeleted),
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
      .pipe(ofType(engineCreateSuccess))
      .subscribe(() => {
        this.dialogRef.close();
      });
    this.updatedSuccessSubscription = this.updates$
      .pipe(ofType(engineUpdateSuccess))
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
