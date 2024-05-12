import { ApiError } from '@scifi/http';

export type DialogContent = ApiError & {
  title: string;
  content?: string;
  buttons?: {
    newOrder?: string;
  };
  deletedUser?: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
};
