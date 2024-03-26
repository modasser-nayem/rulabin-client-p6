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

export type TResetPasswordData = {
   token: string;
   data: {
      userId: string;
      newPassword: string;
      confirmPassword: string;
   };
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
      forgotPassword: builder.mutation({
         query: (data: { email: string }) => ({
            url: "/auth/forgot-password",
            method: "POST",
            body: data,
         }),
      }),
      resetPassword: builder.mutation({
         query: (arg: TResetPasswordData) => ({
            url: "/auth/reset-password",
            method: "POST",
            headers: {
               Authorization: arg.token,
            },
            body: arg.data,
         }),
      }),
   }),
});

export const {
   useLoginUserMutation,
   useRegisterUserMutation,
   useForgotPasswordMutation,
   useResetPasswordMutation,
} = authApi;
