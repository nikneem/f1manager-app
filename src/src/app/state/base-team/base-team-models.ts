export class BaseTeamDto {
  public id?: string;
  public name?: string;
  public base?: string;
  public principal?: string;
  public technicalChief?: string;
  public firstDriverId?: string;
  public secondDriverId?: string;
  public engineId?: string;
  public chassisId?: string;
  public isAvailable?: boolean;
  public isDeleted?: boolean;

  constructor(init?: Partial<BaseTeamDto>) {
    Object.assign(this, init);
  }
}
export class BaseTeamListFilterDto {
  public name?: string;
  public deleted?: boolean;

  constructor(init?: Partial<BaseTeamListFilterDto>) {
    Object.assign(this, init);
  }
}
