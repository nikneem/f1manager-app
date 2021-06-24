export class LeagueCreateDto {
  public name?: string;

  constructor(init?: Partial<LeagueCreateDto>) {
    Object.assign(this, init);
  }
}
export class LeagueDto {
  public id?: string;
  public name?: string;
  public ownerName?: string;
  public isOwner?: boolean;
  public createdOn?: string;
  public membersCount?: number;
  public teamPosition?: number;
  public pointsAverage?: number;

  constructor(init?: Partial<LeagueDto>) {
    Object.assign(this, init);
  }
}

export class LeagueListItemDto {
  public id?: string;
  public name?: string;
  public membersCount?: number;
  public createdOn?: string;

  constructor(init?: Partial<LeagueListItemDto>) {
    Object.assign(this, init);
  }
}

export class LeagueMemberDto {
  public id?: string;
  public teamId?: string;
  public name?: string;
  public points?: number;
  public money?: number;
  constructor(init?: Partial<LeagueMemberDto>) {
    Object.assign(this, init);
  }
}

export class LeagueJoinRequestDto {
  public id?: string;
  public teamId?: string;
  public teamName?: string;
  public requestedOn?: Date;
  constructor(init?: Partial<LeagueJoinRequestDto>) {
    Object.assign(this, init);
  }
}
