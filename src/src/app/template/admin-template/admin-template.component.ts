import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from '@state/app.state';
import { NotificationMessageDto } from '@state/notification/notification-models';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'f1-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.scss'],
})
export class AdminTemplateComponent implements OnInit, OnDestroy {
  private notificationSubscription?: Subscription;
  private notificationSnackSubscription?: Subscription;

  constructor(
    private store: Store<AppState>,
    private messageService: MessageService,
    private translate: TranslateService,
    private snackbar: MatSnackBar
  ) {}

  private showPopupMessage(notification: NotificationMessageDto): void {
    if (!notification.showAsPopup) {
      return;
    }

    this.translate
      .get(
        [notification.titleTranslationKey, notification.bodyTranslationKey],
        notification.substitutions
      )
      .subscribe((result) => {
        this.messageService.add({
          severity: notification.severity,
          summary: result[notification.titleTranslationKey],
          detail: result[notification.bodyTranslationKey],
        });
      });
  }

  ngOnInit(): void {
    this.notificationSubscription = this.store
      .select((str) => str.notificationState.latestMessage)
      .subscribe((val) => {
        if (val) {
          this.showPopupMessage(val);
        }
      });
    this.notificationSnackSubscription = this.store
      .select((str) => str.notificationState.snackMessage)
      .subscribe((snackMessage) => {
        if (snackMessage) {
          this.translate
            .get(snackMessage)
            .subscribe((val) =>
              this.snackbar.open(val, undefined, { duration: 4500 })
            );
        }
      });
  }
  ngOnDestroy(): void {
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
  }
}
