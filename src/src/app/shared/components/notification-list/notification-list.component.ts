import { Component, OnInit } from '@angular/core';
import { NotificationMessageDto } from '@state/notification/notification-models';

@Component({
  selector: 'f1-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent implements OnInit {
  public notifications: Array<NotificationMessageDto>;

  constructor() {
    this.notifications = new Array<NotificationMessageDto>();

    let notification = new NotificationMessageDto({
      titleTranslationKey: 'notification.raceresultcalculated.title',
      bodyTranslationKey: 'notification.raceresultcalculated.body',
      isRead: false,
      showAsPopup: false,
      showInNotificationArea: true,
      severity: 'info',
      typeIdentifier: 'raceresultcalculated',
      substitutions: { earnedPoints: 100 },
    });

    let error = new NotificationMessageDto({
      titleTranslationKey: 'notification.raceresultcalculated.title',
      bodyTranslationKey: 'notification.raceresultcalculated.body',
      isRead: true,
      showAsPopup: false,
      showInNotificationArea: true,
      severity: 'error',
      typeIdentifier: 'raceresultcalculated',
      substitutions: { earnedPoints: 100 },
    });

    let success = new NotificationMessageDto({
      titleTranslationKey: 'notification.raceresultcalculated.title',
      bodyTranslationKey: 'notification.raceresultcalculated.body',
      isRead: false,
      showAsPopup: false,
      showInNotificationArea: true,
      severity: 'success',
      typeIdentifier: 'raceresultcalculated',
      substitutions: { earnedPoints: 100 },
    });

    this.notifications.push(notification);
    this.notifications.push(error);
    this.notifications.push(success);
  }

  markAsRead(notification: NotificationMessageDto) {
    if (!notification.isRead) {
      notification.isRead = true;
    }
  }

  ngOnInit(): void {}
}
