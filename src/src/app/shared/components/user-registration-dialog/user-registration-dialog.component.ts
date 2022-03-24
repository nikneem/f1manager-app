import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { userRegistration } from '@state/user/user-actions';
import { UserRegistrationDto } from '@state/user/user-models';
import { Subscription } from 'rxjs';
import Validation from '../../form-validation';

@Component({
  selector: 'f1-user-registration-dialog',
  templateUrl: './user-registration-dialog.component.html',
  styleUrls: ['./user-registration-dialog.component.scss'],
})
export class UserRegistrationDialogComponent implements OnInit {
  public registrationForm: FormGroup;
  private loginSubscription?: Subscription;
  private errorMessageSubscription?: Subscription;
  public errorMessage?: string;
  private passwordRegex: string =
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$';

  constructor(
    private store: Store<AppState>,
    private dialogRef: MatDialogRef<UserRegistrationDialogComponent>
  ) {
    this.registrationForm = new FormGroup(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        emailAddress: new FormControl('', [
          Validators.required,
          Validators.email,
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.passwordRegex),
        ]),
        passwordCompare: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      },
      {
        validators: [Validation.match('password', 'passwordCompare')],
      }
    );
  }

  hasPasswordValidationError(): boolean {
    if (
      this.registrationForm.controls['passwordCompare'] &&
      this.registrationForm.controls['passwordCompare'].errors
    ) {
      return this.registrationForm.controls['passwordCompare'].errors[
        'matching'
      ];
    }
    return false;
  }

  public register() {
    if (this.registrationForm.valid && !this.registrationForm.pristine) {
      let dto = new UserRegistrationDto(this.registrationForm.value);
      this.store.dispatch(userRegistration({ dto: dto }));
    }
  }

  ngOnInit(): void {
    this.loginSubscription = this.store
      .select((str) => str.userState.isLoggedOn)
      .subscribe((val) => {
        if (val) {
          this.dialogRef.close();
        }
      });
    this.errorMessageSubscription = this.store
      .select((str) => str.userState.errorMessage)
      .subscribe((val) => {
        this.errorMessage = val;
      });
  }
}
