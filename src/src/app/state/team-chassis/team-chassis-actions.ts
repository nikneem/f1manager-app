import { createAction, props } from '@ngrx/store';
import { SellConfirmationDto } from 'src/app/shared/models/sell-confirmation-model';
import { TeamChassisDto } from './team-chassis-models';

export const teamChassisGet = createAction(
  '[TeamChassis] Get',
  props<{ teamId: string }>()
);
export const teamChassisBuy = createAction(
  '[TeamChassis] Buy',
  props<{ chassisId: string }>()
);
export const teamChassisGetSuccess = createAction(
  '[TeamChassis] GetSuccess',
  props<{ payload?: TeamChassisDto }>()
);

export const teamChassisSellConfirmation = createAction(
  '[TeamChassis] Sell Confirmation',
  props<{ teamChassisId: string }>()
);
export const teamChassisSellConfirmationSuccess = createAction(
  '[TeamChassis] Sell Confirmation Success',
  props<{ payload: SellConfirmationDto }>()
);

export const teamChassisSell = createAction(
  '[TeamChassis] Sell',
  props<{ teamId: string }>()
);
export const teamChassisSellSuccess = createAction(
  '[TeamChassis] Sell Success'
);

export const teamChassisFailure = createAction(
  '[TeamChassis] Failure',
  props<{ message?: string }>()
);
