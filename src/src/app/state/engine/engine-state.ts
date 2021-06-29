import { EngineDto, EnginesListFilterDto } from './engine-models';

export interface EngineState {
  isLoading: boolean;
  errorMessage?: string;
  engines?: Array<EngineDto>;
  activeEngines?: Array<EngineDto>;
  filter: EnginesListFilterDto;
}

export const INITIAL_ENGINE_STATE: EngineState = {
  isLoading: false,
  filter: new EnginesListFilterDto(),
};
