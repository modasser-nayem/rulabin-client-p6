import { baseApi } from "../../api/baseApi";

type TLoginData = {
   email: string;
   password: string;
};

type TRegisterData = {
   name: string;
   email: string;
   password: string;
   confirmPassword: string;
};

const authApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      registerUser: builder.mutation({
         query: (data: TRegisterData) => ({
            url: "/auth/register",
            method: "POST",
            body: data,
         }),
      }),
      loginUser: builder.mutation({
         query: (data: TLoginData) => ({
            url: "/auth/login",
            method: "POST",
            body: data,
         }),
      }),
   }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
