import { createSlice } from "@reduxjs/toolkit";
import {
  chartPostMiddleWare,
  getRunzListDetailsMiddleWare,
  getRunzListMiddleWare,
  getRunzUpdatesMiddleWare,
} from "./runzMiddleware";
import { RunzDetailsReducerState, RunzListReducerState } from "./runz.types";

const getRunzListInitialState: RunzListReducerState = {
  isLoading: false,
  error: "",
};

const getRunzListReducer = createSlice({
  name: "getRunzList_list",
  initialState: getRunzListInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRunzListMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(getRunzListMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getRunzListMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

const getRunzListDetailsInitialState: RunzDetailsReducerState = {
  isLoading: false,
  error: "",
  data: {
    experiment: {
      _id: "",
      procedureId: "",
      procedurename: "",
      testobjective: "",
      dueDate: "",
      status: "",
      datas: "",
      organization: "",
      department: "",
      labType: "",
      createdBy: "",
      createdAt: "",
      updatedAt: "",
    },
  },
};

const getRunzListDetailsReducer = createSlice({
  name: "getRunzListDetails_list",
  initialState: getRunzListDetailsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRunzListDetailsMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(getRunzListDetailsMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getRunzListDetailsMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

const getRunzUpdatesInitialState: any = {
  isLoading: false,
  error: "",
};

const getRunzUpdatesReducer = createSlice({
  name: "getRunzUpdates_list",
  initialState: getRunzUpdatesInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRunzUpdatesMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(getRunzUpdatesMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getRunzUpdatesMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

const chartPostInitialState: any = {
  isLoading: false,
  error: "",
};

const chartPostReducer = createSlice({
  name: "chart_post",
  initialState: chartPostInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(chartPostMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(chartPostMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(chartPostMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export const getRunzListReducers = getRunzListReducer.reducer;
export const getRunzListDetailsReducers = getRunzListDetailsReducer.reducer;
export const getRunzUpdatesReducers = getRunzUpdatesReducer.reducer;
export const chartPostReducers = chartPostReducer.reducer;
