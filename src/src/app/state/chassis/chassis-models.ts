export class ChassisDto {
  public id?: string;
  public name?: string;
  public manufacturer?: string;
  public model?: string;
  public pictureUrl?: string;
  public value?: number;
  public weeklyWearOff?: number;
  public maxWearOff?: number;
  public isAvailable?: boolean;
  public isDeleted?: boolean;
  public activeFrom?: Date;
  public activeUntil?: Date;

  constructor(init?: Partial<ChassisDto>) {
    Object.assign(this, init);
  }
}
export class ChassisListFilterDto {
  public name?: string;
  public deleted?: boolean;

  constructor(init?: Partial<ChassisListFilterDto>) {
    Object.assign(this, init);
  }
}
