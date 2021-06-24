import { PlayerInformationDto } from './player-models';

export interface PlayerState {
  isLoggedOn: boolean;
  information: PlayerInformationDto | null;
}

export const INITIAL_PLAYER_STATE: PlayerState = {
  isLoggedOn: false,
  information: null,
};
