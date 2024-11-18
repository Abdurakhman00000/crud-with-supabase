import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<USER.getUserResponse, USER.getUserRequest>({
      query: () => ({
        url: "/get-user",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    postUser: builder.mutation<USER.postUserResponse, USER.postUserRequest>({
      query: (data) => ({
        url: "/post-user",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["user"],
    }),
    updataUser: builder.mutation<
      USER.updateUserResponse,
      USER.updateUserRequest
    >({
      query: (updatedUser) => ({ 
        url: `/edit-user/${updatedUser.id}`,
        method: "PATCH",
        body: updatedUser,
      }),
      invalidatesTags: ["user"],
    }),
    deleteUser: builder.mutation<USER.deleteUserResponse, USER.deleteUserRequest>({
      query: (id) => ({
        url: `/delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetUserQuery, usePostUserMutation, useUpdataUserMutation, useDeleteUserMutation } = api;