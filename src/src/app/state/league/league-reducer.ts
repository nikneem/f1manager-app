import { Action, createReducer, on } from '@ngrx/store';
import {
  leagueAcceptRequestSuccess,
  leagueCreate,
  leagueCreateFailed,
  leagueCreateSuccess,
  leagueDeclineRequestSuccess,
  leagueFailed,
  leagueGet,
  leagueGetMembers,
  leagueGetMembersSuccess,
  leagueGetMine,
  leagueGetMineFailed,
  leagueGetMineSuccess,
  leagueGetRequests,
  leagueGetRequestsSuccess,
  leagueGetSuccess,
  leagueJoin,
  leagueJoinFailed,
  leagueJoinSuccess,
  leagueSearch,
  leagueSearchSuccess,
} from './league-actions';
import { LeagueDto, LeagueJoinRequestDto } from './league-models';
import { INITIAL_LEAGUE_STATE, LeagueState } from './league-state';

const _leagueReducer = createReducer(
  INITIAL_LEAGUE_STATE,
  on(leagueGetMine, (state) => ({
    ...state,
    isLoadingMine: true,
  })),
  on(leagueGetMineSuccess, (state, { payload }) => ({
    ...state,
    isLoadingMine: false,
    mine: payload,
  })),
  on(leagueGetMineFailed, (state, { errorMessage }) => ({
    ...state,
    isLoadingMine: false,
    errorMessage: errorMessage,
  })),
  on(leagueCreate, (state) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
  })),
  on(leagueCreateSuccess, (state, { payload }) => {
    return leagueCreatedSuccessHandler(state, payload);
  }),
  on(leagueCreateFailed, (state, { errorMessage }) => ({
    ...state,
    isLoading: false,
    errorMessage: errorMessage,
  })),

  on(leagueGet, (state) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
  })),
  on(leagueGetSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    league: payload,
  })),

  on(leagueGetMembers, (state) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
  })),
  on(leagueGetMembersSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    leagueMembers: payload,
  })),

  on(leagueGetRequestsSuccess, (state, { payload }) => ({
    ...state,
    leagueRequests: payload,
  })),

  on(leagueAcceptRequestSuccess, (state, { requestId }) => {
    return leagueRequestAssessmentResultHandler(state, requestId);
  }),
  on(leagueDeclineRequestSuccess, (state, { requestId }) => {
    return leagueRequestAssessmentResultHandler(state, requestId);
  }),

  on(leagueJoin, (state) => ({
    ...state,
    leagueJoining: true,
    leagueJoinErrorMessage: undefined,
  })),
  on(leagueJoinSuccess, (state) => ({
    ...state,
    leagueJoining: false,
  })),
  on(leagueJoinFailed, (state, { errorMessage }) => ({
    ...state,
    leagueJoining: false,
    leagueJoinErrorMessage: errorMessage,
  })),

  on(leagueSearch, (state, { term }) => ({
    ...state,
    searchTerm: term,
  })),
  on(leagueSearchSuccess, (state, { payload }) => ({
    ...state,
    searchResults: payload,
  })),

  on(leagueFailed, (state, { errorMessage }) => ({
    ...state,
    isLoading: false,
    errorMessage: errorMessage,
  }))
);

function leagueCreatedSuccessHandler(
  state: LeagueState,
  message: LeagueDto
): LeagueState {
  const copyState: LeagueState = Object.assign({}, state);

  debugger;
  let leaguesList = copyState.mine
    ? new Array<LeagueDto>(...copyState.mine)
    : new Array<LeagueDto>();

  leaguesList.push(message);
  copyState.mine = leaguesList;
  copyState.isLoading = false;

  return copyState;
}
function leagueRequestAssessmentResultHandler(
  state: LeagueState,
  requestId: string | undefined
): LeagueState {
  const copyState: LeagueState = Object.assign({}, state);

  debugger;
  let requestsList = copyState.leagueRequests
    ? new Array<LeagueJoinRequestDto>(...copyState.leagueRequests)
    : new Array<LeagueJoinRequestDto>();

  if (requestId) {
    const request = requestsList.find((r) => r.id === requestId);
    if (request) {
      const requestIndex = requestsList.indexOf(request);
      if (!isNaN(requestIndex)) {
        requestsList.splice(requestIndex, 1);
      }
    }
  }

  copyState.leagueRequests = requestsList;

  return copyState;
}

export function leagueReducer(state: LeagueState | undefined, action: Action) {
  return _leagueReducer(state, action);
}
