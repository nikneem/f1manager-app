export class SellConfirmationDto {
  public id?: string;
  public name?: string;
  public numberOfRacesDriven?: number;
  public currentValue?: number;
  public wearOffPercentage?: number;
  public sellingPrice?: number;

  constructor(init?: Partial<SellConfirmationDto>) {
    Object.assign(this, init);
  }
}

export class ComponentPurchaseDto {
  public componentId: string;

  constructor(cId: string) {
    this.componentId = cId;
  }
}

export interface CollectionResult<T> {
  page: number;
  pageSize: number;
  totalPages: number;
  totalEntries: number;
  entities: Array<T>;
}
