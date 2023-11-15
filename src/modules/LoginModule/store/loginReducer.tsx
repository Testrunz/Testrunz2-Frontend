import { createSlice } from "@reduxjs/toolkit";
import {
  authMeMiddleWare,
  signUpMiddleWare,
  uploadMiddleWare,
} from "./loginMiddleware";
import type {
  AuthMeReducerState,
  UploadReducerState,
  signUpReducerState,
} from "./login.types";

const signUpInitialState: signUpReducerState = {
  isLoading: false,
  error: "",
};

const signUpReducer = createSlice({
  name: "signUp",
  initialState: signUpInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUpMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(signUpMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(signUpMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

const authMeInitialState: AuthMeReducerState = {
  isLoading: false,
  error: "",
  data: {
    name: "",
    email: "",
    firebaseId: "",
    timeZone: "",
    role: "",
    created_at: "",
    updated_at: "",
    __v: 0,
    _id: "",
    firstuse: false,
    activeStatus: false,
    imageUrl: "",
    firstname: "",
    lastname: "",
  },
};

const authMeReducer = createSlice({
  name: "auth_me",
  initialState: authMeInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authMeMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(authMeMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(authMeMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

const uploadInitialState: UploadReducerState = {
  isLoading: false,
  error: "",
  imageUrl: "",
};

const uploadReducer = createSlice({
  name: "upload",
  initialState: uploadInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(uploadMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.imageUrl = action.payload?.imageUrl;
    });
    builder.addCase(uploadMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export const signUpReducers = signUpReducer.reducer;
export const authMeReducers = authMeReducer.reducer;
export const uploadReducers = uploadReducer.reducer;
