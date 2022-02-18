import {
  LeagueDto,
  LeagueJoinRequestDto,
  LeagueListItemDto,
  LeagueMemberDto,
} from './league-models';

export interface LeagueState {
  isLoadingMine: boolean;
  mine?: Array<LeagueListItemDto>;

  searchTerm?: string;
  searchResults?: Array<LeagueListItemDto>;

  leagueJoining: boolean;
  leagueJoinErrorMessage?: string;

  league?: LeagueDto;
  leagueMembers?: Array<LeagueMemberDto>;
  leagueRequests?: Array<LeagueJoinRequestDto>;

  isLoading: boolean;
  errorMessage?: string;
}

export const INITIAL_LEAGUE_STATE: LeagueState = {
  isLoadingMine: false,
  isLoading: false,
  leagueJoining: false,
};
