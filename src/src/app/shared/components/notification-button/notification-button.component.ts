import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationListComponent } from '@components/notification-list/notification-list.component';

@Component({
  selector: 'f1-notification-button',
  templateUrl: './notification-button.component.html',
  styleUrls: ['./notification-button.component.scss'],
})
export class NotificationButtonComponent implements OnInit {
  public badgeCount: string;
  constructor(private dialog: MatDialog) {
    this.badgeCount = '5';
  }

  showNotifications() {
    this.dialog.open(NotificationListComponent, {
      width: '80%',
    });
  }

  ngOnInit(): void {}
}
