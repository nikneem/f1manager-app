import { createAction, props } from '@ngrx/store';
import { BaseTeamDto, BaseTeamListFilterDto } from './base-team-models';

export const baseTeamFilterUpdate = createAction(
  '[BaseTeam] Filter',
  props<{ payload: BaseTeamListFilterDto }>()
);

export const baseTeamGetList = createAction(
  '[BaseTeam] Get List',
  props<{ payload: BaseTeamListFilterDto | undefined }>()
);
export const baseTeamGetListSuccess = createAction(
  '[BaseTeam] Get List Success',
  props<{ payload: Array<BaseTeamDto> }>()
);

export const baseTeamCreate = createAction(
  '[BaseTeam] Create',
  props<{ payload: BaseTeamDto }>()
);
export const baseTeamCreateSuccess = createAction(
  '[BaseTeam] Create Success',
  props<{ payload: BaseTeamDto }>()
);

export const baseTeamUpdate = createAction(
  '[BaseTeam] Update',
  props<{ id: string; payload: BaseTeamDto }>()
);
export const baseTeamUpdateSuccess = createAction(
  '[BaseTeam] Update Success',
  props<{ payload: BaseTeamDto }>()
);

export const baseTeamDelete = createAction(
  '[BaseTeam] Delete',
  props<{ id: string }>()
);
export const baseTeamDeleteSuccess = createAction(
  '[BaseTeam] Delete Success',
  props<{ id: string }>()
);

export const baseTeamError = createAction(
  '[BaseTeam] Error',
  props<{ errorMessage: string | undefined }>()
);
