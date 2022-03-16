import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '@services/users.service';
import { PasswordResetVerificationDto } from '@state/user/user-models';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'f1-passwordverify-page',
  templateUrl: './passwordverify-page.component.html',
  styleUrls: ['./passwordverify-page.component.scss'],
})
export class PasswordverifyPageComponent implements OnInit {
  public passwordVerificationForm: FormGroup;
  public success: boolean = false;
  public failed: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService
  ) {
    this.passwordVerificationForm = new FormGroup({
      user: new FormControl('', [Validators.required]),
      code: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
      ]),
    });
  }

  verify() {
    if (this.passwordVerificationForm.valid) {
      let dto = new PasswordResetVerificationDto({
        usernameOrEmail: this.passwordVerificationForm.controls['user'].value,
        VerificationCode: this.passwordVerificationForm.controls['code'].value,
      });
      this.usersService
        .resetPasswordConfirmation(dto)
        .pipe(
          map((r) => r.ok),
          catchError((e) => {
            return of(false);
          })
        )
        .subscribe((val) => {
          this.success = val;
          this.failed = !val;
        });
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((val) => {
      this.passwordVerificationForm.patchValue({
        user: val['user'],
        code: val['code'],
      });
    });
  }
}
