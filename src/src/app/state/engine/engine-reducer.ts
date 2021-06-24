import { Action, createReducer, on } from '@ngrx/store';
import {
  engineGetAvailable,
  engineGetAvailableSuccess,
} from './engine-actions';
import { EngineState, INITIAL_ENGINE_STATE } from './engine-state';

const _engineReducer = createReducer(
  INITIAL_ENGINE_STATE,
  on(engineGetAvailable, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(engineGetAvailableSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    engines: payload,
  }))
);

export function engineReducer(state: EngineState | undefined, action: Action) {
  return _engineReducer(state, action);
}
