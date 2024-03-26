import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TAuthUser } from "../../../types/user.types";
import { RootState } from "../../store";

type TAuthState = {
   user: null | TAuthUser;
   token: null | string;
};

const initialState: TAuthState = {
   user: null,
   token: null,
};

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      loginUser: (
         state,
         action: PayloadAction<{ user: TAuthUser; token: string }>
      ) => {
         state.user = action.payload.user;
         state.token = action.payload.token;
      },
      logOutUser: (state) => {
         state.user = null;
         state.token = null;
      },
   },
});

export const { loginUser, logOutUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
