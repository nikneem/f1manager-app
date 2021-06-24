import { createAction, props } from '@ngrx/store';
import { PlayerInformationDto } from './player-models';

export const playerLogin = createAction('[Player] Login');
export const playerLogout = createAction('[Player] Logout');
export const resolvePlayer = createAction(
  '[Player] Resolve',
  props<{ payload: PlayerInformationDto | null }>()
);
export const resolvePlayerSuccess = createAction(
  '[Player] ResolveSuccess',
  props<{ payload: PlayerInformationDto | null }>()
);
