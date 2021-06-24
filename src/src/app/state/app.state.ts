import { baseTeamReducer } from './base-team/base-team-reducer';
import {
  BaseTeamState,
  INITIAL_BASE_TEAM_STATE,
} from './base-team/base-team-state';
import { chassisReducer } from './chassis/chassis-reducer';
import { ChassisState, INITIAL_CHASSIS_STATE } from './chassis/chassis-state';
import { driverReducer } from './driver/driver-reducer';
import { DriverState, INITIAL_DRIVER_STATE } from './driver/driver-state';
import { engineReducer } from './engine/engine-reducer';
import { EngineState, INITIAL_ENGINE_STATE } from './engine/engine-state';
import { leagueReducer } from './league/league-reducer';
import { INITIAL_LEAGUE_STATE, LeagueState } from './league/league-state';
import { notificationReducer } from './notification/notification-reducer';
import {
  INITIAL_NOTIFICATION_STATE,
  NotificationState,
} from './notification/notification-state';
import { playerReducer } from './player/player-reducer';
import { INITIAL_PLAYER_STATE, PlayerState } from './player/player-state';
import { teamChassisReducer } from './team-chassis/team-chassis-reducer';
import {
  INITIAL_TEAMCHASSIS_STATE,
  TeamChassisState,
} from './team-chassis/team-chassis-state';
import { teamDriverReducer } from './team-driver/team-driver-reducer';
import {
  INITIAL_TEAMDRIVER_STATE,
  TeamDriverState,
} from './team-driver/team-driver-state';
import { teamEngineReducer } from './team-engine/team-engine-reducer';
import {
  INITIAL_TEAMENGINE_STATE,
  TeamEngineState,
} from './team-engine/team-engine-state';
import { teamReducer } from './team/team-reducer';
import { INITIAL_TEAM_STATE, TeamState } from './team/team-state';
import { userReducer } from './user/user-reducer';
import { INITIAL_USER_STATE, UserState } from './user/user-state';

export interface AppState {
  userState: UserState;
  playerState: PlayerState;
  teamState: TeamState;
  teamDriverState: TeamDriverState;
  teamEngineState: TeamEngineState;
  teamChassisState: TeamChassisState;
  baseTeamState: BaseTeamState;
  driverState: DriverState;
  engineState: EngineState;
  chassisState: ChassisState;
  notificationState: NotificationState;
  leaguesState: LeagueState;
}

export const INITIAL_APPSTATE: AppState = {
  userState: INITIAL_USER_STATE,
  playerState: INITIAL_PLAYER_STATE,
  teamState: INITIAL_TEAM_STATE,
  teamDriverState: INITIAL_TEAMDRIVER_STATE,
  teamEngineState: INITIAL_TEAMENGINE_STATE,
  teamChassisState: INITIAL_TEAMCHASSIS_STATE,
  baseTeamState: INITIAL_BASE_TEAM_STATE,
  driverState: INITIAL_DRIVER_STATE,
  engineState: INITIAL_ENGINE_STATE,
  chassisState: INITIAL_CHASSIS_STATE,
  notificationState: INITIAL_NOTIFICATION_STATE,
  leaguesState: INITIAL_LEAGUE_STATE,
};

export const reducers = {
  userState: userReducer,
  playerState: playerReducer,
  teamState: teamReducer,
  teamDriverState: teamDriverReducer,
  teamEngineState: teamEngineReducer,
  teamChassisState: teamChassisReducer,
  baseTeamState: baseTeamReducer,
  driverState: driverReducer,
  engineState: engineReducer,
  chassisState: chassisReducer,
  notificationState: notificationReducer,
  leaguesState: leagueReducer,
};
