/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
   baseUrl: "http://localhost:5000/api/v1",
   prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
         headers.set("authorization", token);
      }
      return headers;
   },
});

export const baseApi = createApi({
   reducerPath: "baseApi",
   tagTypes: ["auth", "category", "brand", "products"],
   baseQuery: baseQuery,
   endpoints: () => ({}),
});

type TReduxRtqError = {
   status: number;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   data: any;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isReduxRtqError = (error: any): error is TReduxRtqError => {
   return (
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      "data" in error
   );
};
