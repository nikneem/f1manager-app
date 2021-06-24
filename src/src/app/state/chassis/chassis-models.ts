export class ChassisDto {
  public id?: string;
  public name?: string;
  public pictureUrl?: string;
  public currentValue?: number;
  public weeklyWearOutPercentage?: number;
  public maxWearOutPercentage?: number;
  public activeFrom?: Date;
  public activeUntil?: Date;
  public isAvailable?: boolean;
  public isDeleted?: boolean;

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