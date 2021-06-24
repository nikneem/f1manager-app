import { Action, createReducer, on } from '@ngrx/store';
import {
  teamEngineBuy,
  teamEngineFailure,
  teamEngineGet,
  teamEngineGetSuccess,
  teamEngineSell,
  teamEngineSellConfirmation,
  teamEngineSellConfirmationSuccess,
  teamEngineSellSuccess,
} from './team-engine-actions';
import { INITIAL_TEAMENGINE_STATE, TeamEngineState } from './team-engine-state';

const _teamEngineReducer = createReducer(
  INITIAL_TEAMENGINE_STATE,
  on(teamEngineGet, (state) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
  })),
  on(teamEngineBuy, (state) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
  })),
  on(teamEngineGetSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    engine: payload,
    hasEngine: payload != null,
  })),
  on(teamEngineSellConfirmation, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(teamEngineSellConfirmationSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    sellConfirmation: payload,
  })),
  on(teamEngineSell, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(teamEngineSellSuccess, (state) => ({
    ...state,
    isLoading: false,
    hasEngine: false,
    engine: undefined,
    sellConfirmation: undefined,
  })),

  on(teamEngineFailure, (state, { message }) => ({
    ...state,
    isLoading: false,
    hasEngine: false,
    sellConfirmation: undefined,
    errorMessage: message,
  }))
);

export function teamEngineReducer(
  state: TeamEngineState | undefined,
  action: Action
) {
  return _teamEngineReducer(state, action);
}
