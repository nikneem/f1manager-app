import { Action, createReducer, on } from '@ngrx/store';
import {
  driverCreate,
  driverCreateSuccess,
  driverDelete,
  driverDeleteSuccess,
  driverError,
  driverFilterUpdate,
  driverGetAvailable,
  driverGetAvailableSuccess,
  driverGetList,
  driverGetListSuccess,
  driverUndeleteSuccess,
  driverUpdate,
  driverUpdateSuccess,
} from './driver-actions';
import { DriverDto } from './driver-models';
import { DriverState, INITIAL_DRIVER_STATE } from './driver-state';

const _driverReducer = createReducer(
  INITIAL_DRIVER_STATE,
  on(driverFilterUpdate, (state, { payload }) => ({
    ...state,
    filter: payload,
  })),

  on(driverGetList, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(driverGetListSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    drivers: payload,
  })),

  on(driverCreate, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(driverCreateSuccess, (state, { payload }) =>
    driverCreateSuccessHandler(state, payload)
  ),

  on(driverUpdate, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(driverUpdateSuccess, (state, { payload }) =>
    driverUpdateSuccessHandler(state, payload)
  ),

  on(driverDelete, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(driverDeleteSuccess, (state, { id }) =>
    driverDeleteSuccessHandler(state, id)
  ),
  on(driverUndeleteSuccess, (state, { id }) =>
    driverUndeleteSuccessHandler(state, id)
  ),

  on(driverGetAvailable, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(driverGetAvailableSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    activeDrivers: payload,
  })),

  on(driverError, (state, { errorMessage }) => ({
    ...state,
    isLoading: false,
    errorMessage: errorMessage,
  }))
);

function driverCreateSuccessHandler(
  state: DriverState,
  payload: DriverDto
): DriverState {
  const copyState: DriverState = Object.assign({}, state);

  let driversList = copyState.drivers
    ? new Array<DriverDto>(...copyState.drivers)
    : new Array<DriverDto>();

  driversList.push(payload);
  copyState.drivers = driversList;
  copyState.isLoading = false;

  return copyState;
}

function driverUpdateSuccessHandler(
  state: DriverState,
  payload: DriverDto
): DriverState {
  const copyState: DriverState = Object.assign({}, state);

  let driversList = copyState.drivers
    ? new Array<DriverDto>(...copyState.drivers)
    : new Array<DriverDto>();

  const driverIndex = driversList.findIndex((elm) => elm.id === payload.id);
  if (driverIndex >= 0) {
    driversList.splice(driverIndex, 1, payload);
  }
  copyState.drivers = driversList;
  copyState.isLoading = false;

  return copyState;
}

function driverDeleteSuccessHandler(
  state: DriverState,
  id: string
): DriverState {
  const copyState: DriverState = Object.assign({}, state);

  let driversList = copyState.drivers
    ? new Array<DriverDto>(...copyState.drivers)
    : new Array<DriverDto>();

  const driverIndex = driversList.findIndex((elm) => elm.id === id);
  if (driverIndex >= 0) {
    if (copyState.filter.deleted) {
      const copyDriver: DriverDto = Object.assign({}, driversList[driverIndex]);
      copyDriver.isDeleted = true;
      driversList.splice(driverIndex, 1, copyDriver);
    } else {
      driversList.splice(driverIndex, 1);
    }
  }
  copyState.drivers = driversList;
  copyState.isLoading = false;

  return copyState;
}

function driverUndeleteSuccessHandler(
  state: DriverState,
  id: string
): DriverState {
  const copyState: DriverState = Object.assign({}, state);

  let driversList = copyState.drivers
    ? new Array<DriverDto>(...copyState.drivers)
    : new Array<DriverDto>();

  const driverIndex = driversList.findIndex((elm) => elm.id === id);
  if (driverIndex >= 0) {
    const copyDriver: DriverDto = Object.assign({}, driversList[driverIndex]);
    copyDriver.isDeleted = false;
    driversList.splice(driverIndex, 1, copyDriver);
  }
  copyState.drivers = driversList;
  copyState.isLoading = false;

  return copyState;
}

export function driverReducer(state: DriverState | undefined, action: Action) {
  return _driverReducer(state, action);
}
