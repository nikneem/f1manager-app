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
import * as _ from 'lodash';
import {
  LeagueDto,
  LeagueJoinRequestDto,
  LeagueListItemDto,
  LeagueMemberDto,
} from './league-models';
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
    league: undefined,
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
  on(leagueGetMembersSuccess, (state, { members }) => {
    return leagueEnrichMembers(state, members);
  }),
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

function leagueEnrichMembers(
  state: LeagueState,
  members: Array<LeagueMemberDto>
): LeagueState {
  const copyState: LeagueState = Object.assign({}, state);
  if (copyState.league) {
    let league = Object.assign({}, copyState.league);
    let membersList = copyState.league?.members
      ? new Array<LeagueMemberDto>(...copyState.league.members)
      : new Array<LeagueMemberDto>();
    members.forEach((elm, index) => {
      const existingMember = membersList.find((r) => r.teamId === elm.teamId);
      if (existingMember) {
        let existingIndex = membersList.indexOf(existingMember);
        if (existingIndex >= 0) {
          let enrichedMember = new LeagueMemberDto({
            teamId: elm.teamId,
            name: elm.name,
            money: elm.money,
            points: elm.points,
            isMaintainer: elm.isMaintainer,
          });
          membersList.splice(existingIndex, 1, enrichedMember);
        }
      }
    });
    league.members = _.orderBy(membersList, ['points'], 'desc');
    copyState.league = league;
  }
  copyState.isLoading = false;
  return copyState;
}
function leagueCreatedSuccessHandler(
  state: LeagueState,
  message: LeagueDto
): LeagueState {
  const copyState: LeagueState = Object.assign({}, state);
  let leaguesList = copyState.mine
    ? new Array<LeagueListItemDto>(...copyState.mine)
    : new Array<LeagueListItemDto>();

  let newListItem = new LeagueListItemDto({
    id: message.id,
    createdOn: message.createdOn,
    name: message.name,
    members: message.members?.length,
  });

  leaguesList.push(newListItem);
  copyState.mine = leaguesList;
  copyState.isLoading = false;

  return copyState;
}
function leagueRequestAssessmentResultHandler(
  state: LeagueState,
  requestId: string | undefined
): LeagueState {
  const copyState: LeagueState = Object.assign({}, state);
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
