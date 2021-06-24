import { Action, createReducer, on } from '@ngrx/store';
import {
  teamChassisBuy,
  teamChassisFailure,
  teamChassisGet,
  teamChassisGetSuccess,
  teamChassisSell,
  teamChassisSellConfirmation,
  teamChassisSellConfirmationSuccess,
  teamChassisSellSuccess,
} from './team-chassis-actions';
import {
  INITIAL_TEAMCHASSIS_STATE,
  TeamChassisState,
} from './team-chassis-state';

const _teamChassisReducer = createReducer(
  INITIAL_TEAMCHASSIS_STATE,
  on(teamChassisGet, (state) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
  })),
  on(teamChassisBuy, (state) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
  })),
  on(teamChassisGetSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    chassis: payload,
    hasChassis: payload != null,
  })),
  on(teamChassisSellConfirmation, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(teamChassisSellConfirmationSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    sellConfirmation: payload,
  })),
  on(teamChassisSell, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(teamChassisSellSuccess, (state) => ({
    ...state,
    isLoading: false,
    chassis: undefined,
    hasChassis: false,
    sellConfirmation: undefined,
  })),

  on(teamChassisFailure, (state, { message }) => ({
    ...state,
    isLoading: false,
    hasChassis: false,
    sellConfirmation: undefined,
    errorMessage: message,
  }))
);

export function teamChassisReducer(
  state: TeamChassisState | undefined,
  action: Action
) {
  return _teamChassisReducer(state, action);
}
