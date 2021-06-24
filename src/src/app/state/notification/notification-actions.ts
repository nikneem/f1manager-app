import { createAction, props } from '@ngrx/store';
import { NotificationMessageDto } from './notification-models';

export const notificationCreate = createAction(
  '[Notification] Create',
  props<{ message: NotificationMessageDto }>()
);

export const notifySnackbar = createAction(
  '[Notification] Snack',
  props<{ translationKey: string }>()
);
