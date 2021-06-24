import { createAction, props } from '@ngrx/store';
import { SellConfirmationDto } from 'src/app/shared/models/sell-confirmation-model';
import { TeamDriverDto } from './team-driver-models';

export const teamDriverGetFirst = createAction(
  '[TeamDriver] GetFirstDriver',
  props<{ teamId: string }>()
);
export const teamDriverGetFirstSuccess = createAction(
  '[TeamDriver] GetFirstDriver Success',
  props<{ payload?: TeamDriverDto }>()
);
export const teamDriverGetSecond = createAction(
  '[TeamDriver] GetSecondDriver',
  props<{ teamId: string }>()
);
export const teamDriverGetSecondSuccess = createAction(
  '[TeamDriver] GetSecondDriver Success',
  props<{ payload?: TeamDriverDto }>()
);

export const teamDriverBuyFirst = createAction(
  '[TeamDriver] BuyFirstDriver',
  props<{ driverId: string }>()
);
export const teamDriverBuyFirstSuccess = createAction(
  '[TeamDriver] BuyFirstDriver Success',
  props<{ payload?: TeamDriverDto }>()
);
export const teamDriverBuySecond = createAction(
  '[TeamDriver] BuyFirstSecond',
  props<{ driverId: string }>()
);
export const teamDriverBuySecondSuccess = createAction(
  '[TeamDriver] BuyFirstSecond Success',
  props<{ payload?: TeamDriverDto }>()
);

export const teamDriverSellConfirmation = createAction(
  '[TeamDriver] Sell Confirmation',
  props<{ teamDriverId: string }>()
);
export const teamDriverSellConfirmationSuccess = createAction(
  '[TeamDriver] Sell Confirmation Success',
  props<{ payload: SellConfirmationDto }>()
);

export const teamDriverSell = createAction(
  '[TeamDriver] Sell',
  props<{ teamDriverId: string }>()
);
export const teamDriverSellSuccess = createAction(
  '[TeamDriver] Sell Success',
  props<{ teamDriverId: string }>()
);

export const teamDriverFailure = createAction(
  '[TeamDriver] Failure',
  props<{ message?: string }>()
);
