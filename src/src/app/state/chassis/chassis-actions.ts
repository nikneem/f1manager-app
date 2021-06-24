import { createAction, props } from '@ngrx/store';
import { ChassisDto, ChassisListFilterDto } from './chassis-models';

export const chassisFilterUpdate = createAction(
  '[Chassis] Filter',
  props<{ payload: ChassisListFilterDto }>()
);

export const chassisGetList = createAction(
  '[Chassis] Get List',
  props<{ payload: ChassisListFilterDto | undefined }>()
);
export const chassisGetListSuccess = createAction(
  '[Chassis] Get List Success',
  props<{ payload: Array<ChassisDto> }>()
);

export const chassisCreate = createAction(
  '[Chassis] Create',
  props<{ payload: ChassisDto }>()
);
export const chassisCreateSuccess = createAction(
  '[Chassis] Create Success',
  props<{ payload: ChassisDto }>()
);

export const chassisUpdate = createAction(
  '[Chassis] Update',
  props<{ id: string; payload: ChassisDto }>()
);
export const chassisUpdateSuccess = createAction(
  '[Chassis] Update Success',
  props<{ payload: ChassisDto }>()
);

export const chassisDelete = createAction(
  '[Chassis] Delete',
  props<{ id: string }>()
);
export const chassisDeleteSuccess = createAction(
  '[Chassis] Delete Success',
  props<{ id: string }>()
);

export const chassisUndelete = createAction(
  '[Chassis] Undelete',
  props<{ id: string }>()
);

export const chassisGetAvailable = createAction('[Chassis] Get Available');
export const chassisGetAvailableSuccess = createAction(
  '[Chassis] Get Available Success',
  props<{ payload: Array<ChassisDto> | undefined }>()
);
export const chassisError = createAction(
  '[Chassis] Get Available Failed',
  props<{ errorMessage: string | undefined }>()
);
