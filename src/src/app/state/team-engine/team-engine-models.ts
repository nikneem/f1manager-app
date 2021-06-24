export class TeamEngineDto {
  id?: string;
  name?: string;
  manufacturer?: string;
  model?: string;
  pictureUrl?: string;
  boughtOn?: Date;
  boughtFor?: number;
  currentPrice?: number;
  wearOff?: number;
  maxWearOff?: number;
  pointsGained?: number;

  constructor(init?: Partial<TeamEngineDto>) {
    Object.assign(this, init);
  }
}
