import { Action, createReducer, on } from '@ngrx/store';
import {
  teamCreate,
  teamCreateSuccess,
  teamErrorMessage,
  teamGet,
  teamGetSuccess,
  teamUpdateSuccess,
} from './team-actions';
import { TeamDetailsDto } from './team-models';
import { INITIAL_TEAM_STATE, TeamState } from './team-state';

const _teamReducer = createReducer(
  INITIAL_TEAM_STATE,
  on(teamGet, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(teamGetSuccess, (state, { payload }) => updateTeamDetails(state, payload)),
  on(teamCreate, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(teamCreateSuccess, (state, { payload }) =>
    updateTeamDetails(state, payload)
  ),
  on(teamErrorMessage, (state, { message }) => ({
    ...state,
    isLoading: false,
    errorMessage: message,
  }))
);

export function teamReducer(state: TeamState | undefined, action: Action) {
  return _teamReducer(state, action);
}

export function updateTeamDetails(
  state: TeamState | undefined,
  payload?: TeamDetailsDto
): TeamState {
  return {
    ...state,
    isLoading: false,
    id: payload?.id,
    model: payload,
  };
}
