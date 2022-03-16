import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UsersService } from '@services/users.service';
import { AppState } from '@state/app.state';
import { NotificationMessageDto } from '@state/notification/notification-models';
import { ChangePasswordDto } from '@state/user/user-models';
import { notificationCreate } from '@state/notification/notification-actions';
import { catchError, map, of } from 'rxjs';
import Validation from 'src/app/shared/form-validation';

@Component({
  selector: 'f1-change-password-page',
  templateUrl: './change-password-page.component.html',
  styleUrls: ['./change-password-page.component.scss'],
})
export class ChangePasswordPageComponent implements OnInit {
  public changePasswordForm: FormGroup;
  private passwordRegex: string =
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$';
  constructor(
    private usersService: UsersService,
    private store: Store<AppState>
  ) {
    this.changePasswordForm = new FormGroup(
      {
        oldPassword: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [
          Validators.required,
          Validators.pattern(this.passwordRegex),
        ]),
        confirmPassword: new FormControl(''),
      },
      {
        validators: [Validation.match('newPassword', 'confirmPassword')],
      }
    );
  }

  changePassword() {
    if (this.changePasswordForm.valid) {
      let payload = new ChangePasswordDto(this.changePasswordForm.value);
      this.usersService
        .changePassword(payload)
        .pipe(
          map((r) => r.ok),
          catchError((err) => of(false))
        )
        .subscribe((result) => {
          let title = 'user.change-password.failed.title';
          let body = 'user.change-password.failed.text';
          let severity = 'error';
          if (result) {
            title = 'user.change-password.success.title';
            body = 'user.change-password.success.text';
            severity = 'success';
          }
          this.changePasswordForm.reset();
          let notification = new NotificationMessageDto({
            titleTranslationKey: title,
            bodyTranslationKey: body,
            severity: severity,
          });
          this.store.dispatch(
            notificationCreate({
              message: notification,
            })
          );
        });
    }
  }

  hasPasswordValidationError(): boolean {
    if (
      this.changePasswordForm.controls['confirmPassword'] &&
      this.changePasswordForm.controls['confirmPassword'].errors
    ) {
      return this.changePasswordForm.controls['confirmPassword'].errors[
        'matching'
      ];
    }
    return false;
  }

  ngOnInit(): void {}
}
