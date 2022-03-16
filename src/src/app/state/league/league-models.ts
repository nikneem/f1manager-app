export class LeagueCreateDto {
  public name?: string;

  constructor(init?: Partial<LeagueCreateDto>) {
    Object.assign(this, init);
  }
}
export class LeagueDto {
  public id?: string;
  public name?: string;
  public isMaintainer?: boolean;
  public createdOn?: string;
  public members?: Array<LeagueMemberDto>;

  constructor(init?: Partial<LeagueDto>) {
    Object.assign(this, init);
  }
}

export class LeagueListItemDto {
  public id?: string;
  public name?: string;
  public members?: number;
  public createdOn?: string;

  constructor(init?: Partial<LeagueListItemDto>) {
    Object.assign(this, init);
  }
}

export class LeagueMemberDto {
  public teamId?: string;
  public isMaintainer?: boolean;
  public name?: string;
  public points?: number;
  public money?: number;
  constructor(init?: Partial<LeagueMemberDto>) {
    Object.assign(this, init);
  }
}

export class LeagueJoinRequestDto {
  public teamId?: string;
  public teamName?: string;
  public createdOn?: Date;
  public expiresOn?: Date;
  constructor(init?: Partial<LeagueJoinRequestDto>) {
    Object.assign(this, init);
  }
}
