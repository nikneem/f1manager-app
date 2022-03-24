import { Action, createReducer, on } from '@ngrx/store';
import {
  baseTeamCreate,
  baseTeamCreateSuccess,
  baseTeamDelete,
  baseTeamDeleteSuccess,
  baseTeamError,
  baseTeamFilterUpdate,
  baseTeamGetList,
  baseTeamGetListSuccess,
  baseTeamUndeleteSuccess,
  baseTeamUpdate,
  baseTeamUpdateSuccess,
} from './base-team-actions';
import { BaseTeamDto } from './base-team-models';
import { BaseTeamState, INITIAL_BASE_TEAM_STATE } from './base-team-state';

const _baseTeamReducer = createReducer(
  INITIAL_BASE_TEAM_STATE,
  on(baseTeamFilterUpdate, (state, { payload }) => ({
    ...state,
    filter: payload,
  })),
  on(baseTeamGetList, (state, { payload }) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
  })),
  on(baseTeamCreate, (state, { payload }) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
  })),
  on(baseTeamUpdate, (state, { payload }) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
  })),
  on(baseTeamDelete, (state, { id }) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
  })),
  on(baseTeamGetListSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    baseTeams: payload,
  })),
  on(baseTeamCreateSuccess, (state, { payload }) =>
    addOrUpdateBaseTeamHandler(state, payload)
  ),
  on(baseTeamUpdateSuccess, (state, { payload }) =>
    addOrUpdateBaseTeamHandler(state, payload)
  ),
  on(baseTeamDeleteSuccess, (state, { id }) =>
    deleteBaseTeamHandler(state, id)
  ),
  on(baseTeamUndeleteSuccess, (state, { id }) =>
    baseTeamUndeleteSuccessHandler(state, id)
  ),
  on(baseTeamError, (state, { errorMessage }) => ({
    ...state,
    isLoading: false,
    errorMessage: errorMessage,
  }))
);

function addOrUpdateBaseTeamHandler(
  state: BaseTeamState,
  payload: BaseTeamDto
): BaseTeamState {
  const copyState: BaseTeamState = Object.assign({}, state);

  let driversList = copyState.baseTeams
    ? new Array<BaseTeamDto>(...copyState.baseTeams)
    : new Array<BaseTeamDto>();

  const driverIndex = driversList.findIndex((elm) => elm.id === payload.id);
  if (driverIndex >= 0) {
    driversList.splice(driverIndex, 1, payload);
  } else {
    driversList.push(payload);
  }
  copyState.baseTeams = driversList;
  copyState.isLoading = false;

  return copyState;
}
function deleteBaseTeamHandler(
  state: BaseTeamState,
  id: string
): BaseTeamState {
  const copyState: BaseTeamState = Object.assign({}, state);

  let driversList = copyState.baseTeams
    ? new Array<BaseTeamDto>(...copyState.baseTeams)
    : new Array<BaseTeamDto>();

  const driverIndex = driversList.findIndex((elm) => elm.id === id);
  if (driverIndex >= 0) {
    driversList.splice(driverIndex, 1);
  }
  copyState.baseTeams = driversList;
  copyState.isLoading = false;

  return copyState;
}
function baseTeamUndeleteSuccessHandler(
  state: BaseTeamState,
  id: string
): BaseTeamState {
  const copyState: BaseTeamState = Object.assign({}, state);

  let driversList = copyState.baseTeams
    ? new Array<BaseTeamDto>(...copyState.baseTeams)
    : new Array<BaseTeamDto>();

  const driverIndex = driversList.findIndex((elm) => elm.id === id);
  if (driverIndex >= 0) {
    const copyDriver: BaseTeamDto = Object.assign({}, driversList[driverIndex]);
    copyDriver.isDeleted = false;
    driversList.splice(driverIndex, 1, copyDriver);
  }
  copyState.baseTeams = driversList;
  copyState.isLoading = false;
  return copyState;
}

export function baseTeamReducer(
  state: BaseTeamState | undefined,
  action: Action
) {
  return _baseTeamReducer(state, action);
}
