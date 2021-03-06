export class TeamDriverDto {
  id?: string;
  driverId?: string;
  name?: string;
  pictureUrl?: string;
  boughtOn?: Date;
  boughtFor?: number;
  currentPrice?: number;
  pointsGained?: number;

  constructor(init?: Partial<TeamDriverDto>) {
    Object.assign(this, init);
  }
}
