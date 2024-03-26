/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
   baseUrl: "http://localhost:5000/api/v1",
});

export const baseApi = createApi({
   reducerPath: "pokemonApi",
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
