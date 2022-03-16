import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { UsersService } from '@services/users.service';
import { AppState } from '@state/app.state';
import { PasswordResetDto } from '@state/user/user-models';

@Component({
  selector: 'f1-user-reset-password-dialog',
  templateUrl: './user-reset-password-dialog.component.html',
  styleUrls: ['./user-reset-password-dialog.component.scss'],
})
export class UserResetPasswordDialogComponent implements OnInit {
  public resetPasswordForm: FormGroup;
  public errorMessage?: string;
  public isLoading: boolean = false;
  public isLoggedIn: boolean = false;
  public completed: boolean = false;

  constructor(
    private usersService: UsersService,
    private dialogRef: MatDialogRef<UserResetPasswordDialogComponent>
  ) {
    this.resetPasswordForm = new FormGroup({
      usernameOrEmail: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      baseUrl: new FormControl(window.location.origin),
    });
  }

  reset() {
    let dto = new PasswordResetDto(this.resetPasswordForm.value);
    this.usersService.resetPassword(dto).subscribe((val) => {
      this.completed = val.ok;
      if (val.ok) {
        setTimeout(() => this.dialogRef.close(), 3500);
      }
    });
  }

  ngOnInit(): void {}
}
