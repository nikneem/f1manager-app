import { Action, createReducer, on } from '@ngrx/store';
import {
  teamDriverBuyFirst,
  teamDriverBuyFirstSuccess,
  teamDriverBuySecond,
  teamDriverBuySecondSuccess,
  teamDriverFailure,
  teamDriverGetFirst,
  teamDriverGetFirstSuccess,
  teamDriverGetSecondSuccess,
  teamDriverSell,
  teamDriverSellConfirmation,
  teamDriverSellConfirmationSuccess,
  teamDriverSellSuccess,
} from './team-driver-actions';
import { INITIAL_TEAMDRIVER_STATE, TeamDriverState } from './team-driver-state';

const _teamDriverReducer = createReducer(
  INITIAL_TEAMDRIVER_STATE,
  on(teamDriverGetFirst, (state) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
  })),
  on(teamDriverBuyFirst, (state) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
  })),
  on(teamDriverGetFirstSuccess, (state, { payload }) => {
    return {
      ...state,
      isLoading: false,
      firstDriver: payload,
    };
  }),
  on(teamDriverGetSecondSuccess, (state, { payload }) => {
    return {
      ...state,
      isLoading: false,
      secondDriver: payload,
    };
  }),
  on(teamDriverBuyFirst, (state) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
  })),
  on(teamDriverBuySecond, (state) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
  })),
  on(teamDriverBuyFirstSuccess, (state, { payload }) => {
    return {
      ...state,
      isLoading: false,
      firstDriver: payload,
    };
  }),
  on(teamDriverBuySecondSuccess, (state, { payload }) => {
    return {
      ...state,
      isLoading: false,
      secondDriver: payload,
    };
  }),

  on(teamDriverSellConfirmation, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(teamDriverSellConfirmationSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    sellConfirmation: payload,
  })),
  on(teamDriverSell, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(teamDriverSellSuccess, (state, { teamDriverId }) => ({
    ...state,
    isLoading: false,
    firstDriver:
      state.firstDriver?.id === teamDriverId ? undefined : state.firstDriver,
    secondDriver:
      state.secondDriver?.id === teamDriverId ? undefined : state.secondDriver,
    sellConfirmation: undefined,
  })),

  on(teamDriverFailure, (state, { message }) => ({
    ...state,
    isLoading: false,
    sellConfirmation: undefined,
    errorMessage: message,
  }))
);

export function teamDriverReducer(
  state: TeamDriverState | undefined,
  action: Action
) {
  return _teamDriverReducer(state, action);
}
