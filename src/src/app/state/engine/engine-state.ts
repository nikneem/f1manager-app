import { EngineDto } from './engine-models';

export interface EngineState {
  isLoading: boolean;
  errorMessage: string | undefined;
  engines: Array<EngineDto> | undefined;
}

export const INITIAL_ENGINE_STATE: EngineState = {
  isLoading: false,
  errorMessage: undefined,
  engines: undefined,
};
