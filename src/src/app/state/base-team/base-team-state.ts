import { BaseTeamDto, BaseTeamListFilterDto } from './base-team-models';

export interface BaseTeamState {
  isLoading: boolean;
  errorMessage?: string;
  baseTeams?: Array<BaseTeamDto>;
  filter: BaseTeamListFilterDto;
}

export const INITIAL_BASE_TEAM_STATE: BaseTeamState = {
  isLoading: false,
  filter: new BaseTeamListFilterDto(),
};
