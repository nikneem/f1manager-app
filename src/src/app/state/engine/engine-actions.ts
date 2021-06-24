import { createAction, props } from '@ngrx/store';
import { EngineDto } from './engine-models';

export const engineGetAvailable = createAction('[Engine] GetAvailable');
export const engineGetAvailableSuccess = createAction(
  '[Engine] Get Available Succeeded',
  props<{ payload: Array<EngineDto> | undefined }>()
);
export const engineError = createAction(
  '[Engine] Get Available Failed',
  props<{ errorMessage: string | undefined }>()
);
