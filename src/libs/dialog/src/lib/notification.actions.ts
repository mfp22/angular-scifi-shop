import { createAction, props } from '@ngrx/store';
import { ApiError } from '@scifi/http';
import { of } from 'rxjs';

export const showDialog = createAction('[App Component] Show Dialog');
export const hideDialog = createAction('[App Component] Hide Dialog');

export const httpError = createAction('[Dialog Component] Set Error Message', props<ApiError>());

export const notify = createAction(
  '[Dialog Component] Set Notification Message',
  props<{
    title: string;
    content: string;
    buttons?: { [key: string]: string };
    deletedUser?: {
      id: number;
      name: string;
      username: string;
      email: string;
    };
  }>(),
);

export const forceRetry = createAction('[Dialog Component] Force Retry');

export const dispatchErrorAction = ({ error }: { error: ApiError }) => of(httpError(error));
