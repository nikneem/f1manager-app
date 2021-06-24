import { NotificationMessageDto } from './notification-models';

export interface NotificationState {
  isLoading: boolean;
  errorMessage?: string;
  messages: Array<NotificationMessageDto>;
  latestMessage?: NotificationMessageDto;
  snackMessage?: string;
}

export const INITIAL_NOTIFICATION_STATE: NotificationState = {
  isLoading: false,
  messages: new Array<NotificationMessageDto>(),
};
