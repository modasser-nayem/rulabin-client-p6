/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TRtqErrorResponse = {
   data?: {
      success: boolean;
      message: string;
      error: any;
   };
   error?: any;
   status: number | string;
};

export type TRtqQueryResponse<T> = {
   error?: TRtqErrorResponse;
   data?: T;
   success?: boolean;
   message?: string;
} & BaseQueryApi;
