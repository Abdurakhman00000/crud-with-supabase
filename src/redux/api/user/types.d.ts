/* eslint-disable @typescript-eslint/no-unused-vars */
namespace USER {
  type getUserResponse = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
  }[];

  type getUserRequest = void;

  type postUserResponse = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
  };

  type postUserRequest = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
  };

  type updateUserResponse = {
    id: number;
    firstName: string;
    lastName: string;
  };

  type updateUserRequest = {
    id: number;
    firstName: string;
    lastName: string;
  };

  type deleteUserResponse = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
  };

  type deleteUserRequest = number;
}
