import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { notificationCreate, notifySnackbar } from './notification-actions';
import { NotificationMessageDto } from './notification-models';
import {
  INITIAL_NOTIFICATION_STATE,
  NotificationState,
} from './notification-state';

const _notificationReducer = createReducer(
  INITIAL_NOTIFICATION_STATE,
  on(notificationCreate, (state, { message }) => {
    return notificationCreatedHandler(state, message);
  }),
  on(notifySnackbar, (state, { translationKey }) => ({
    ...state,
    snackMessage: translationKey,
  }))
);

function notificationCreatedHandler(
  state: NotificationState,
  message: NotificationMessageDto
): NotificationState {
  const copyState: NotificationState = Object.assign({}, state);

  const newNotificationsList = new Array<NotificationMessageDto>(
    ...copyState.messages
  );

  newNotificationsList.push(message);
  copyState.messages = newNotificationsList;
  copyState.latestMessage = message;

  return copyState;
}

export function notificationReducer(
  state: NotificationState | undefined,
  action: Action
) {
  return _notificationReducer(state, action);
}
