import { Action, createReducer, on } from '@ngrx/store';
import {
  userLogin,
  userLoginAttempt,
  userLoginAttemptSucceeded,
  userLoginSucceeded,
} from './user-actions';
import { INITIAL_USER_STATE, UserState } from './user-state';
import jwt_decode from 'jwt-decode';
import { LoginResultDto } from './user-models';

const _userReducer = createReducer(
  INITIAL_USER_STATE,
  on(userLoginAttempt, (state) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
  })),
  on(userLoginAttemptSucceeded, (state, { attempt }) => ({
    ...state,
    isLoading: false,
    loginAttempt: attempt.id,
    rsaPublicKey: attempt.rsaPublicKey,
    errorMessage: undefined,
  })),
  on(userLogin, (state, { attempt }) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
  })),
  on(userLoginSucceeded, (state, { result }) =>
    userLoginSucceededHandler(state, result)
  )
);

function userLoginSucceededHandler(
  state: UserState,
  payload: LoginResultDto
): UserState {
  const copyState: UserState = Object.assign({}, state);

  if (payload.jwtToken) {
    let parsedToken = jwt_decode(payload.jwtToken) as any;
    copyState.isAdministrator =
      parsedToken.admin !== undefined && parsedToken.admin === true;
  }

  copyState.isLoading = false;
  copyState.loginToken = payload.jwtToken;
  copyState.refreshToken = payload.refreshToken;
  copyState.errorMessage = payload.errorMessage;
  copyState.isLoggedOn = payload.jwtToken ? true : false;

  return copyState;
}

export function userReducer(state: UserState | undefined, action: Action) {
  return _userReducer(state, action);
}
