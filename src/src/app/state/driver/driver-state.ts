import { DriverDto, DriverListFilterDto } from './driver-models';

export interface DriverState {
  isLoading: boolean;
  errorMessage?: string;
  drivers?: Array<DriverDto>;
  activeDrivers?: Array<DriverDto>;
  filter: DriverListFilterDto;
}

export const INITIAL_DRIVER_STATE: DriverState = {
  isLoading: false,
  filter: new DriverListFilterDto(),
};
