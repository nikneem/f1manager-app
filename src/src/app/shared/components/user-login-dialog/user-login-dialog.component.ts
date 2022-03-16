import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { userLogin, userLoginAttempt } from '@state/user/user-actions';
import { LoginRequestDto } from '@state/user/user-models';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserResetPasswordDialogComponent } from '@components/user-reset-password-dialog/user-reset-password-dialog.component';

@Component({
  selector: 'f1-user-login-dialog',
  templateUrl: './user-login-dialog.component.html',
  styleUrls: ['./user-login-dialog.component.scss'],
})
export class UserLoginDialogComponent implements OnInit, OnDestroy {
  private loginAttemptSubscription?: Subscription;
  private attemptId?: string;
  private rsaPublicKey?: string;
  private attemptVector?: string;

  public loginForm?: FormGroup;
  public errorMessage?: string;
  public isLoading: boolean = false;
  public isLoggedIn: boolean = false;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<UserLoginDialogComponent>
  ) {}

  constructForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onKeyUp(event: any) {
    if (event.key === 'Enter') {
      this.login();
    }
  }

  passwordReset() {
    this.dialog.open(UserResetPasswordDialogComponent, {
      width: '20%',
    });
  }

  async login() {
    if (
      this.attemptId &&
      this.rsaPublicKey &&
      this.loginForm?.valid &&
      !this.loginForm?.pristine
    ) {
      let username = this.loginForm.controls['username'].value;
      let password = this.loginForm.controls['password'].value;

      var key = await this.importPublicKey(this.rsaPublicKey);
      var encryptedUsername = await this.encryptData(username, key);
      var encryptedPassword = await this.encryptData(password, key);

      var request = new LoginRequestDto({
        id: this.attemptId,
        username: encryptedUsername,
        password: encryptedPassword,
      });
      this.store.dispatch(userLogin({ attempt: request }));
    }
  }

  async importPublicKey(spki: string) {
    const binaryDer = this.base64ToArrayBuffer(spki);
    var cryptoKey = await window.crypto.subtle.importKey(
      'spki',
      binaryDer,
      {
        name: 'RSA-OAEP',
        length: 256,
        hash: { name: 'sha-256' },
      },
      false,
      ['encrypt']
    );
    return cryptoKey;
  }

  async encryptData(message: string, cryptoKey: CryptoKey) {
    let enc = new TextEncoder();
    let encodedMessage = enc.encode(message);
    var encryptedData = await window.crypto.subtle.encrypt(
      {
        name: 'RSA-OAEP',
      },
      cryptoKey,
      encodedMessage
    );
    var encodedData = this.arrayBufferToBase64(encryptedData);
    return encodedData;
  }

  base64ToArrayBuffer(base64: string): any {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }
  arrayBufferToBase64(buffer: any) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  ngOnInit(): void {
    this.loginAttemptSubscription = this.store
      .select((str) => str.userState)
      .subscribe((val) => {
        this.attemptId = val.loginAttempt;
        this.rsaPublicKey = val.rsaPublicKey;
        this.constructForm();

        this.errorMessage = val.errorMessage;
        this.isLoading = val.isLoading;
        if (!this.isLoggedIn && val.isLoggedOn && val.loginToken) {
          this.dialogRef.close();
        }
      });

    this.store.dispatch(userLoginAttempt());
  }
  ngOnDestroy(): void {
    if (this.loginAttemptSubscription) {
      this.loginAttemptSubscription.unsubscribe();
    }
  }
}
