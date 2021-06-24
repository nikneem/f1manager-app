import { ChassisDto, ChassisListFilterDto } from './chassis-models';

export interface ChassisState {
  isLoading: boolean;
  errorMessage?: string;
  chassis?: Array<ChassisDto>;
  activeChassis?: Array<ChassisDto>;
  filter: ChassisListFilterDto;
}

export const INITIAL_CHASSIS_STATE: ChassisState = {
  isLoading: false,
  filter: new ChassisListFilterDto(),
};
