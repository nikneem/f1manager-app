export class TeamCreateDto {
  public name?: string;

  constructor(init?: Partial<TeamCreateDto>) {
    Object.assign(this, init);
  }
}

export interface TeamFilterDto {
  name: string;
  teamIds: Array<string>;
  excludeTeamIds: Array<string>;
}

export interface TeamListItemDto {
  id: string;
  name: string;
  points: number;
  money: number;
}

export class TeamDetailsDto {
  public id?: string;
  public name?: string;
  public points?: number;
  public money?: number;

  public isTeamOwner?: boolean;
  public isPublic?: boolean;

  public firstDriverId?: string;
  public secondDriverId?: string;
  public engineId?: string;
  public chassisId?: string;

  constructor(init?: Partial<TeamCreateDto>) {
    Object.assign(this, init);
  }
}

export class TeamUpdateDto {
  public id?: string;
  public name?: string;
  public isPublic?: boolean;

  constructor(init?: Partial<TeamUpdateDto>) {
    Object.assign(this, init);
  }
}
