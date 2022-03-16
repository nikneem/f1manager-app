import { createAction, props } from '@ngrx/store';
import {
  LoginAttemptDto,
  LoginRequestDto,
  LoginResultDto,
  RefreshTokenDto,
  UserRegistrationDto,
} from './user-models';

export const userLoginAttempt = createAction('[User] LoginAttempt');
export const userLoginAttemptSucceeded = createAction(
  '[User] LoginAttemptSucceeded',
  props<{ attempt: LoginAttemptDto }>()
);

export const userLogin = createAction(
  '[User] Login',
  props<{ attempt: LoginRequestDto }>()
);
export const userLoginSucceeded = createAction(
  '[User] LoginSucceeded',
  props<{ result: LoginResultDto }>()
);

export const userLogout = createAction('[User] Logout');

export const userRefresh = createAction(
  '[User] Refresh',
  props<{ token: RefreshTokenDto }>()
);
export const userRefreshFailed = createAction(
  '[User] RefreshFailed',
  props<{ message: string }>()
);

export const userRegistration = createAction(
  '[User] Registration',
  props<{ dto: UserRegistrationDto }>()
);
export const userRegistrationFailed = createAction(
  '[User] RegistrationFailed',
  props<{ message: string }>()
);

export const userLoginFailure = createAction(
  '[User] LoginFailure',
  props<{ message: string }>()
);
