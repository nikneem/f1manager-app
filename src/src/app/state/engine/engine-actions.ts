import { createAction, props } from '@ngrx/store';
import { EngineDto, EnginesListFilterDto } from './engine-models';

export const engineFilterUpdate = createAction(
  '[Engine] Filter',
  props<{ payload: EnginesListFilterDto }>()
);

export const engineGetList = createAction(
  '[Engine] Get List',
  props<{ payload: EnginesListFilterDto | undefined }>()
);
export const engineGetListSuccess = createAction(
  '[Engine] Get List Success',
  props<{ payload: Array<EngineDto> }>()
);

export const engineCreate = createAction(
  '[Engine] Create',
  props<{ payload: EngineDto }>()
);
export const engineCreateSuccess = createAction(
  '[Engine] Create Success',
  props<{ payload: EngineDto }>()
);

export const engineUpdate = createAction(
  '[Engine] Update',
  props<{ id: string; payload: EngineDto }>()
);
export const engineUpdateSuccess = createAction(
  '[Engine] Update Success',
  props<{ payload: EngineDto }>()
);

export const engineDelete = createAction(
  '[Engine] Delete',
  props<{ id: string }>()
);
export const engineDeleteSuccess = createAction(
  '[Engine] Delete Success',
  props<{ id: string }>()
);

export const engineUndelete = createAction(
  '[Engine] Undelete',
  props<{ id: string }>()
);

export const engineGetAvailable = createAction('[Engine] Get Available');
export const engineGetAvailableSuccess = createAction(
  '[Engine] Get Available Success',
  props<{ payload: Array<EngineDto> | undefined }>()
);
export const engineError = createAction(
  '[Engine] Get Available Failed',
  props<{ errorMessage: string | undefined }>()
);
