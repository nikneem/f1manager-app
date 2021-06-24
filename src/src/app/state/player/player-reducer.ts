import { Action, createReducer, on } from '@ngrx/store';
import { playerLogin, playerLogout } from './player-actions';
import { INITIAL_PLAYER_STATE, PlayerState } from './player-state';

const _playerReducer = createReducer(
  INITIAL_PLAYER_STATE,
  on(playerLogin, (state) => ({
    ...state,
    isLoggedOn: true,
  })),
  on(playerLogout, (state) => ({
    ...state,
    isLoggedOn: false,
  }))
);

export function playerReducer(state: PlayerState | undefined, action: Action) {
  return _playerReducer(state, action);
}
