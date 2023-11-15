import { createSlice } from "@reduxjs/toolkit";
import {
  DuplicateReducerState,
  ProcedureByIdReducerState,
  ProceduresReducerState,
} from "./procedures.types";
import {
  procedureMiddleWare,
  procedureByIdMiddleWare,
  duplicateProcedureMiddleWare,
} from "./proceduresMiddleware";

const procedureInitialState: ProceduresReducerState = {
  isLoading: false,
  error: "",
  data: {
    _id: "",
    department: [""],
    labtype: [""],
    name: "",
    organization: "",
    procedureIds: [],
  },
};

const procedureReducer = createSlice({
  name: "procedure_list",
  initialState: procedureInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(procedureMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(procedureMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(procedureMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

const procedureByIdInitialState: ProcedureByIdReducerState = {
  isLoading: false,
  error: "",
  data: {},
};

const procedureByIDReducer = createSlice({
  name: "procedureByID_list",
  initialState: procedureByIdInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(procedureByIdMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(procedureByIdMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(procedureByIdMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

const duplicateProcedureInitialState: DuplicateReducerState = {
  isLoading: false,
  error: "",
};

const duplicateProcedureReducer = createSlice({
  name: "duplicate_procedure_list",
  initialState: duplicateProcedureInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(duplicateProcedureMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(duplicateProcedureMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(duplicateProcedureMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export const procedureReducers = procedureReducer.reducer;
export const procedureByIDReducers = procedureByIDReducer.reducer;
export const duplicateProcedureReducers = duplicateProcedureReducer.reducer;
