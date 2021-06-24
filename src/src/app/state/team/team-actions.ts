import { createAction, props } from '@ngrx/store';
import { TeamCreateDto, TeamDetailsDto, TeamUpdateDto } from './team-models';

export const teamGet = createAction('[Team] Get');
export const teamGetSuccess = createAction(
  '[Team] GetSuccess',
  props<{ payload?: TeamDetailsDto }>()
);

export const teamCreate = createAction(
  '[Team] Create',
  props<{ payload: TeamCreateDto }>()
);
export const teamCreateSuccess = createAction(
  '[Team] CreateSuccess',
  props<{ payload?: TeamDetailsDto }>()
);

export const teamUpdate = createAction(
  '[Team] Update',
  props<{ payload: TeamUpdateDto }>()
);
export const teamUpdateSuccess = createAction(
  '[Team] Update Success',
  props<{ payload?: TeamDetailsDto }>()
);

export const teamErrorMessage = createAction(
  '[Team] ErrorMessage',
  props<{ message?: string }>()
);
