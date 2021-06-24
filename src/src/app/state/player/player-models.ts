export class PlayerInformationDto {
  public displayName: string | null = null;
  public emailAddress: string | null = null;
  public profilePicture: string | null = null;

  constructor(init?: Partial<PlayerInformationDto>) {
    Object.assign(this, init);
  }
}
