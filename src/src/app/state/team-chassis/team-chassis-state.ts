import { SellConfirmationDto } from 'src/app/shared/models/sell-confirmation-model';
import { TeamChassisDto } from './team-chassis-models';

export interface TeamChassisState {
  chassis?: TeamChassisDto;
  sellConfirmation?: SellConfirmationDto;

  isLoading: boolean;
  errorMessage?: string;
}

export const INITIAL_TEAMCHASSIS_STATE: TeamChassisState = {
  isLoading: false,
};
