export type DeleteUserResponse = {
  msg: string;
  deletedUser: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
};
