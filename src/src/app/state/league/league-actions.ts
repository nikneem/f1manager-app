import { createAction, props } from '@ngrx/store';
import { TeamFilterDto } from '@state/team/team-models';
import {
  LeagueCreateDto,
  LeagueDto,
  LeagueJoinRequestDto,
  LeagueListItemDto,
  LeagueMemberDto,
} from './league-models';

export const leagueGetMine = createAction('[League] Get Mine');
export const leagueGetMineSuccess = createAction(
  '[League] Get Mine Success',
  props<{ payload: Array<LeagueListItemDto> | undefined }>()
);
export const leagueGetMineFailed = createAction(
  '[League] Get Mine Failed',
  props<{ errorMessage: string | undefined }>()
);

export const leagueGet = createAction(
  '[League] Get',
  props<{ leagueId: string }>()
);
export const leagueGetSuccess = createAction(
  '[League] Get Success',
  props<{ payload: LeagueDto }>()
);

export const leagueCreate = createAction(
  '[League] Create',
  props<{ payload: LeagueCreateDto }>()
);
export const leagueCreateSuccess = createAction(
  '[League] Create Success',
  props<{ payload: LeagueDto }>()
);
export const leagueCreateFailed = createAction(
  '[League] Create Failed',
  props<{ errorMessage: string | undefined }>()
);

export const leagueGetMembers = createAction(
  '[League] Get Members',
  props<{ filter: TeamFilterDto }>()
);
export const leagueGetMembersSuccess = createAction(
  '[League] Get Members Success',
  props<{ members: Array<LeagueMemberDto> }>()
);

export const leagueGetRequests = createAction(
  '[League] Get Requests',
  props<{ leagueId: string }>()
);
export const leagueGetRequestsSuccess = createAction(
  '[League] Get Requests Success',
  props<{ payload: Array<LeagueJoinRequestDto> }>()
);

export const leagueAcceptRequest = createAction(
  '[League] Accept Requests',
  props<{ leagueId: string; teamId: string }>()
);
export const leagueAcceptRequestSuccess = createAction(
  '[League] Get Accept Success',
  props<{ teamId: string | undefined }>()
);
export const leagueDeclineRequest = createAction(
  '[League] Get Decline Requests',
  props<{ leagueId: string; teamId: string }>()
);
export const leagueDeclineRequestSuccess = createAction(
  '[League] Get Decline Requests Success',
  props<{ teamId: string | undefined }>()
);

export const leagueJoin = createAction(
  '[League] Join',
  props<{ id: string }>()
);
export const leagueJoinSuccess = createAction('[League] Join Success');
export const leagueJoinFailed = createAction(
  '[League] Join Failed',
  props<{ errorMessage: string | undefined }>()
);

export const leagueSearch = createAction(
  '[League] Search',
  props<{ term: string }>()
);
export const leagueSearchSuccess = createAction(
  '[League] Search Success',
  props<{ payload: Array<LeagueListItemDto> }>()
);

export const leagueFailed = createAction(
  '[League] Failed',
  props<{ errorMessage: string }>()
);
