import { SellConfirmationDto } from 'src/app/shared/models/sell-confirmation-model';
import { TeamDriverDto } from './team-driver-models';

export interface TeamDriverState {
  firstDriver?: TeamDriverDto;
  secondDriver?: TeamDriverDto;

  sellConfirmation?: SellConfirmationDto;

  isLoading: boolean;
  errorMessage?: string;
}

export const INITIAL_TEAMDRIVER_STATE: TeamDriverState = {
  isLoading: false,
};
