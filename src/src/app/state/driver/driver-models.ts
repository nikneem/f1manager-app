export class DriverDto {
  public id?: string;
  public name?: string;
  public country?: string;
  public dateOfBirth?: string;
  public pictureUrl?: string;
  public value?: number;
  public activeFrom?: Date;
  public activeTo?: Date;
  public isAvailable?: boolean;
  public isDeleted?: boolean;

  constructor(init?: Partial<DriverDto>) {
    Object.assign(this, init);
  }
}
export class DriverListFilterDto {
  public name?: string;
  public deleted?: boolean;

  constructor(init?: Partial<DriverListFilterDto>) {
    Object.assign(this, init);
  }
}
