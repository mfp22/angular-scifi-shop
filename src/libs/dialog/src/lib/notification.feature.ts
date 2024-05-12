import { createFeature, createReducer, on } from '@ngrx/store';
import { DialogContent } from './dialog-content.type';
import { hideDialog, httpError, notify, showDialog } from './notification.actions';

export type NotificationState = {
  showDialog: boolean;
  data: DialogContent | null;
};

export const initialState: NotificationState = {
  showDialog: false,
  data: null,
};

export const notificationReducer = createReducer(
  initialState,
  on(showDialog, (state) => ({ ...state, showDialog: true })),
  on(hideDialog, (state) => ({ ...state, showDialog: false, data: null })),
  on(httpError, (state, { error }) => {
    return {
      showDialog: true,
      data: {
        title: 'There was an error.',
        error,
      },
    };
  }),
  on(notify, (state, { title, content, buttons }) => {
    return {
      showDialog: true,
      data: {
        title,
        content,
        buttons,
      },
    };
  }),
);

export const notificationFeature = createFeature({
  name: 'notification',
  reducer: notificationReducer,
});

export const { selectShowDialog, selectData } = notificationFeature;
