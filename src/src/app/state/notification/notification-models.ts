export class NotificationMessageDto {
  public id?: string;
  public typeIdentifier?: string;
  public titleTranslationKey: string;
  public bodyTranslationKey: string;
  public isRead: boolean = true;
  public showAsPopup: boolean = true;
  public showInNotificationArea: boolean = true;
  public severity: string;
  public substitutions?: Object;

  constructor(init?: Partial<NotificationMessageDto>, error?: any) {
    this.severity = 'info';
    this.titleTranslationKey = '';
    this.bodyTranslationKey = '';
    if (error) {
      this.severity = 'error';
      this.titleTranslationKey = 'generic.error';
      this.bodyTranslationKey = error.translationKey;
      this.substitutions = error.substitutions;
    }
    Object.assign(this, init);
  }
}

export class NotificationSubstitutionDto {
  public field: string;
  public value: string;

  constructor(field: string, value: string) {
    this.field = field;
    this.value = value;
  }
}
