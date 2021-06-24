import { SellConfirmationDto } from 'src/app/shared/models/sell-confirmation-model';
import { TeamEngineDto } from './team-engine-models';

export interface TeamEngineState {
  engine?: TeamEngineDto;
  sellConfirmation?: SellConfirmationDto;

  isLoading: boolean;
  errorMessage?: string;
}

export const INITIAL_TEAMENGINE_STATE: TeamEngineState = {
  isLoading: false,
};
