import { Action, createReducer, on } from '@ngrx/store';
import {
  engineCreate,
  engineCreateSuccess,
  engineDelete,
  engineDeleteSuccess,
  engineError,
  engineFilterUpdate,
  engineGetAvailable,
  engineGetAvailableSuccess,
  engineGetList,
  engineGetListSuccess,
  engineUndeleteSuccess,
  engineUpdate,
  engineUpdateSuccess,
} from './engine-actions';
import { EngineDto } from './engine-models';
import { EngineState, INITIAL_ENGINE_STATE } from './engine-state';

const _engineReducer = createReducer(
  INITIAL_ENGINE_STATE,
  on(engineFilterUpdate, (state, { payload }) => ({
    ...state,
    filter: payload,
  })),

  on(engineGetList, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(engineGetListSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    engines: payload,
  })),

  on(engineCreate, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(engineCreateSuccess, (state, { payload }) =>
    engineCreateSuccessHandler(state, payload)
  ),

  on(engineUpdate, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(engineUpdateSuccess, (state, { payload }) =>
    engineUpdateSuccessHandler(state, payload)
  ),

  on(engineDelete, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(engineDeleteSuccess, (state, { id }) =>
    engineDeleteSuccessHandler(state, id)
  ),
  on(engineUndeleteSuccess, (state, { id }) =>
    engineUndeleteSuccessHandler(state, id)
  ),

  on(engineGetAvailable, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(engineGetAvailableSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    activeEngines: payload,
  })),

  on(engineError, (state, { errorMessage }) => ({
    ...state,
    isLoading: false,
    errorMessage: errorMessage,
  }))
);

function engineCreateSuccessHandler(
  state: EngineState,
  payload: EngineDto
): EngineState {
  const copyState: EngineState = Object.assign({}, state);

  let chassisList = copyState.engines
    ? new Array<EngineDto>(...copyState.engines)
    : new Array<EngineDto>();

  chassisList.push(payload);
  copyState.engines = chassisList;
  copyState.isLoading = false;

  return copyState;
}

function engineUpdateSuccessHandler(
  state: EngineState,
  payload: EngineDto
): EngineState {
  const copyState: EngineState = Object.assign({}, state);

  let chassisList = copyState.engines
    ? new Array<EngineDto>(...copyState.engines)
    : new Array<EngineDto>();
  if (payload) {
    const chassisIndex = chassisList.findIndex((elm) => elm.id === payload.id);
    if (chassisIndex >= 0) {
      chassisList.splice(chassisIndex, 1, payload);
    }
    copyState.engines = chassisList;
  }
  copyState.isLoading = false;

  return copyState;
}

function engineDeleteSuccessHandler(
  state: EngineState,
  id: string
): EngineState {
  const copyState: EngineState = Object.assign({}, state);

  let chassisList = copyState.engines
    ? new Array<EngineDto>(...copyState.engines)
    : new Array<EngineDto>();

  const chassisIndex = chassisList.findIndex((elm) => elm.id === id);
  if (chassisIndex >= 0) {
    if (copyState.filter.deleted) {
      const copyChassis: EngineDto = Object.assign(
        {},
        chassisList[chassisIndex]
      );
      copyChassis.isDeleted = true;
      chassisList.splice(chassisIndex, 1, copyChassis);
    } else {
      chassisList.splice(chassisIndex, 1);
    }
  }
  copyState.engines = chassisList;
  copyState.isLoading = false;

  return copyState;
}
function engineUndeleteSuccessHandler(
  state: EngineState,
  id: string
): EngineState {
  const copyState: EngineState = Object.assign({}, state);

  let chassisList = copyState.engines
    ? new Array<EngineDto>(...copyState.engines)
    : new Array<EngineDto>();

  const chassisIndex = chassisList.findIndex((elm) => elm.id === id);
  if (chassisIndex >= 0) {
    const copyEngine: EngineDto = Object.assign({}, chassisList[chassisIndex]);
    copyEngine.isDeleted = false;
    chassisList.splice(chassisIndex, 1, copyEngine);
  }
  copyState.engines = chassisList;
  copyState.isLoading = false;

  return copyState;
}

export function engineReducer(state: EngineState | undefined, action: Action) {
  return _engineReducer(state, action);
}
