import { createFeature, createReducer, on } from '@ngrx/store';
import { NotificationState } from '@scifi/types';
import {
  hideDialog,
  httpError,
  notify,
  showDialog,
} from './notification.actions';

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
  })
);

export const notificationFeature = createFeature({
  name: 'notification',
  reducer: notificationReducer,
});

export const { selectShowDialog, selectData } = notificationFeature;
