import { TeamDetailsDto } from './team-models';

export interface TeamState {
  id?: string;
  model?: TeamDetailsDto;

  isLoading: boolean;
  errorMessage?: string;
}

export const INITIAL_TEAM_STATE: TeamState = {
  isLoading: false,
};
