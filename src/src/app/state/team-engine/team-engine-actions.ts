import { createAction, props } from '@ngrx/store';
import { SellConfirmationDto } from 'src/app/shared/models/sell-confirmation-model';
import { TeamEngineDto } from './team-engine-models';

export const teamEngineGet = createAction(
  '[TeamEngine] Get',
  props<{ teamId: string }>()
);
export const teamEngineBuy = createAction(
  '[TeamEngine] Buy',
  props<{ engineId: string }>()
);
export const teamEngineGetSuccess = createAction(
  '[TeamEngine] GetSuccess',
  props<{ payload?: TeamEngineDto }>()
);

export const teamEngineSellConfirmation = createAction(
  '[TeamEngine] Sell Confirmation',
  props<{ teamEngineId: string }>()
);
export const teamEngineSellConfirmationSuccess = createAction(
  '[TeamEngine] Sell Confirmation Success',
  props<{ payload: SellConfirmationDto }>()
);

export const teamEngineSell = createAction(
  '[TeamEngine] Sell',
  props<{ teamEngineId: string }>()
);
export const teamEngineSellSuccess = createAction('[TeamEngine] Sell Success');

export const teamEngineFailure = createAction(
  '[TeamEngine] Failure',
  props<{ message?: string }>()
);
