import { Action, createReducer, on } from '@ngrx/store';
import {
  chassisCreate,
  chassisCreateSuccess,
  chassisDelete,
  chassisDeleteSuccess,
  chassisError,
  chassisFilterUpdate,
  chassisGetAvailable,
  chassisGetAvailableSuccess,
  chassisGetList,
  chassisGetListSuccess,
  chassisUndeleteSuccess,
  chassisUpdate,
  chassisUpdateSuccess,
} from './chassis-actions';
import { ChassisDto } from './chassis-models';
import { ChassisState, INITIAL_CHASSIS_STATE } from './chassis-state';

const _chassisReducer = createReducer(
  INITIAL_CHASSIS_STATE,
  on(chassisFilterUpdate, (state, { payload }) => ({
    ...state,
    filter: payload,
  })),

  on(chassisGetList, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(chassisGetListSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    chassis: payload,
  })),

  on(chassisCreate, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(chassisCreateSuccess, (state, { payload }) =>
    chassisCreateSuccessHandler(state, payload)
  ),

  on(chassisUpdate, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(chassisUpdateSuccess, (state, { payload }) =>
    chassisUpdateSuccessHandler(state, payload)
  ),

  on(chassisDelete, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(chassisDeleteSuccess, (state, { id }) =>
    chassisDeleteSuccessHandler(state, id)
  ),
  on(chassisUndeleteSuccess, (state, { id }) =>
    chassisUndeleteSuccessHandler(state, id)
  ),

  on(chassisGetAvailable, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(chassisGetAvailableSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    activeChassis: payload,
  })),

  on(chassisError, (state, { errorMessage }) => ({
    ...state,
    isLoading: false,
    errorMessage: errorMessage,
  }))
);

function chassisCreateSuccessHandler(
  state: ChassisState,
  payload: ChassisDto
): ChassisState {
  const copyState: ChassisState = Object.assign({}, state);

  let chassisList = copyState.chassis
    ? new Array<ChassisDto>(...copyState.chassis)
    : new Array<ChassisDto>();

  chassisList.push(payload);
  copyState.chassis = chassisList;
  copyState.isLoading = false;

  return copyState;
}

function chassisUpdateSuccessHandler(
  state: ChassisState,
  payload: ChassisDto
): ChassisState {
  const copyState: ChassisState = Object.assign({}, state);

  let chassisList = copyState.chassis
    ? new Array<ChassisDto>(...copyState.chassis)
    : new Array<ChassisDto>();

  const chassisIndex = chassisList.findIndex((elm) => elm.id === payload.id);
  if (chassisIndex >= 0) {
    chassisList.splice(chassisIndex, 1, payload);
  }
  copyState.chassis = chassisList;
  copyState.isLoading = false;

  return copyState;
}

function chassisDeleteSuccessHandler(
  state: ChassisState,
  id: string
): ChassisState {
  const copyState: ChassisState = Object.assign({}, state);

  let chassisList = copyState.chassis
    ? new Array<ChassisDto>(...copyState.chassis)
    : new Array<ChassisDto>();

  const chassisIndex = chassisList.findIndex((elm) => elm.id === id);
  if (chassisIndex >= 0) {
    if (copyState.filter.deleted) {
      const copyChassis: ChassisDto = Object.assign(
        {},
        chassisList[chassisIndex]
      );
      copyChassis.isDeleted = true;
      chassisList.splice(chassisIndex, 1, copyChassis);
    } else {
      chassisList.splice(chassisIndex, 1);
    }
  }
  copyState.chassis = chassisList;
  copyState.isLoading = false;

  return copyState;
}
function chassisUndeleteSuccessHandler(
  state: ChassisState,
  id: string
): ChassisState {
  const copyState: ChassisState = Object.assign({}, state);

  let chassisList = copyState.chassis
    ? new Array<ChassisDto>(...copyState.chassis)
    : new Array<ChassisDto>();

  const chassisIndex = chassisList.findIndex((elm) => elm.id === id);
  if (chassisIndex >= 0) {
    const copyChassis: ChassisDto = Object.assign(
      {},
      chassisList[chassisIndex]
    );
    copyChassis.isDeleted = false;
    chassisList.splice(chassisIndex, 1, copyChassis);
  }
  copyState.chassis = chassisList;
  copyState.isLoading = false;

  return copyState;
}

export function chassisReducer(
  state: ChassisState | undefined,
  action: Action
) {
  return _chassisReducer(state, action);
}
