export class BaseTeamDto {
  public id?: string;
  public name?: string;
  public origin?: string;
  public principal?: string;
  public firstDriver?: string;
  public secondDriver?: string;
  public engine?: string;
  public chassis?: string;
  public firstDriverId?: string;
  public secondDriverId?: string;
  public engineId?: string;
  public chassisId?: string;

  constructor(init?: Partial<BaseTeamDto>) {
    Object.assign(this, init);
  }
}
export class BaseTeamListFilterDto {
  public name?: string;

  constructor(init?: Partial<BaseTeamListFilterDto>) {
    Object.assign(this, init);
  }
}
