import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoginService } from '@services/login.service';
import { UsersService } from '@services/users.service';
import { notificationCreate } from '@state/notification/notification-actions';
import { NotificationMessageDto } from '@state/notification/notification-models';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import {
  userLogin,
  userLoginAttempt,
  userLoginAttemptSucceeded,
  userLoginFailure,
  userLoginSucceeded,
  userRefresh,
  userRefreshFailed,
  userRegistration,
  userRegistrationFailed,
} from './user-actions';

@Injectable()
export class UserEffects {
  constructor(
    private usersService: UsersService,
    private loginService: LoginService,
    private actions$: Actions,
    private router: Router
  ) {}

  userLoginAttempt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userLoginAttempt),
      mergeMap((action) =>
        this.loginService.createAttempt().pipe(
          map((payload) => {
            return userLoginAttemptSucceeded({ attempt: payload });
          }),
          catchError((err) => {
            if (err.status === 409) {
              return of(
                notificationCreate({
                  message: new NotificationMessageDto(undefined, err.error),
                })
              );
            }
            return of(userLoginFailure({ message: 'Unknown error' }));
          })
        )
      )
    )
  );

  userLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userLogin),
      mergeMap((action) =>
        this.loginService.request(action.attempt).pipe(
          map((payload) => {
            return userLoginSucceeded({ result: payload });
          }),
          tap(() => {
            this.router.navigate(['/dashboard']);
          }),
          catchError((err) => {
            if (err.status === 409) {
              return of(
                notificationCreate({
                  message: new NotificationMessageDto(undefined, err.error),
                })
              );
            }
            return of(userLoginFailure({ message: 'Unknown error' }));
          })
        )
      )
    )
  );

  userRefresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userRefresh),
      mergeMap((action) =>
        this.loginService.refresh(action.token).pipe(
          map((payload) => {
            return userLoginSucceeded({ result: payload });
          }),
          tap(() => {
            let redirect = localStorage.getItem('login-redirect');
            localStorage.removeItem('login-redirect');
            if (redirect) {
              this.router.navigate([redirect]);
            }
          }),
          catchError((err) => {
            if (err.status === 409) {
              return of(
                userRefreshFailed({
                  message: err.error.translationKey,
                })
              );
            }
            return of(userLoginFailure({ message: 'Unknown error' }));
          })
        )
      )
    )
  );

  userRegistration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userRegistration),
      mergeMap((action) =>
        this.usersService.register(action.dto).pipe(
          map((payload) => {
            return userLoginSucceeded({ result: payload });
          }),
          tap(() => {
            this.router.navigate(['/dashboard']);
          }),
          catchError((err) => {
            if (err.status === 409) {
              return of(
                userRegistrationFailed({
                  message: err.error.translationKey,
                })
              );
            }
            return of(userLoginFailure({ message: 'Unknown error' }));
          })
        )
      )
    )
  );
}
