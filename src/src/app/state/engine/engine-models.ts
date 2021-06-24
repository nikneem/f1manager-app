export class EngineDto {
  public id?: string;
  public name?: string;
  public manufacturer?: string;
  public model?: string;
  public pictureUrl?: string;
  public price?: number;
  public weeklyWeardown?: number;
  public maxWearDown?: number;

  constructor(init?: Partial<EngineDto>) {
    Object.assign(this, init);
  }
}
