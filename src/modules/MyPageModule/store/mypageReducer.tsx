import { createSlice } from "@reduxjs/toolkit";
import {
  MoreInfoListState,
  MoreInfoUserState,
  MoreInfoUserUpdateState,
} from "./mypage.types";
import {
  moreInfoListMiddleWare,
  moreInfoMiddleWare,
  moreInfoUserMiddleWare,
} from "./mypageMiddleware";

const authMeInitialState: MoreInfoListState = {
  isLoading: false,
  error: "",
  data: [
    {
      _id: "",
      organization: "",
      department: [""],
      labtype: [""],
      createdAt: "",
      updatedAt: "",
      __v: 0,
    },
  ],
};

const moreInfoListReducer = createSlice({
  name: "more_info_list",
  initialState: authMeInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(moreInfoListMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(moreInfoListMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(moreInfoListMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

const moreInfoUserInitialState: MoreInfoUserState = {
  isLoading: false,
  error: "",
  data: {
    _id: "",
    email: "",
    userId: "",
    __v: 0,
    activeStatus: true,
    createdAt: "",
    imageUrl: "",
    labtype: [],
    name: "",
    role: "",
    updatedAt: "",
  },
};

const moreInfoUserReducer = createSlice({
  name: "more_info_user",
  initialState: moreInfoUserInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(moreInfoUserMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(moreInfoUserMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(moreInfoUserMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

const moreInfoUserUpdateInitialState: MoreInfoUserUpdateState = {
  isLoading: false,
  error: "",
};

const moreInfoUserUpdateReducer = createSlice({
  name: "more_info_user_update",
  initialState: moreInfoUserUpdateInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(moreInfoMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(moreInfoMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(moreInfoMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export const moreInfoListReducers = moreInfoListReducer.reducer;
export const moreInfoUserReducers = moreInfoUserReducer.reducer;
export const moreInfoUserUpdateReducers = moreInfoUserUpdateReducer.reducer;
