import { createAction, props } from '@ngrx/store';
import { DriverDto, DriverListFilterDto } from './driver-models';

export const driverFilterUpdate = createAction(
  '[Driver] Filter',
  props<{ payload: DriverListFilterDto }>()
);

export const driverGetList = createAction(
  '[Driver] Get List',
  props<{ payload: DriverListFilterDto | undefined }>()
);
export const driverGetListSuccess = createAction(
  '[Driver] Get List Success',
  props<{ payload: Array<DriverDto> }>()
);

export const driverCreate = createAction(
  '[Driver] Create',
  props<{ payload: DriverDto }>()
);
export const driverCreateSuccess = createAction(
  '[Driver] Create Success',
  props<{ payload: DriverDto }>()
);

export const driverUpdate = createAction(
  '[Driver] Update',
  props<{ id: string; payload: DriverDto }>()
);
export const driverUpdateSuccess = createAction(
  '[Driver] Update Success',
  props<{ payload: DriverDto }>()
);

export const driverDelete = createAction(
  '[Driver] Delete',
  props<{ id: string }>()
);
export const driverDeleteSuccess = createAction(
  '[Driver] Delete Success',
  props<{ id: string }>()
);

export const driverUndelete = createAction(
  '[Driver] Undelete',
  props<{ id: string }>()
);

export const driverGetAvailable = createAction('[Driver] Get Available');
export const driverGetAvailableSuccess = createAction(
  '[Driver] Get Available Success',
  props<{ payload: Array<DriverDto> | undefined }>()
);

export const driverError = createAction(
  '[Driver] Failed',
  props<{ errorMessage: string | undefined }>()
);
