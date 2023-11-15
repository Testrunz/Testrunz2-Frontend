import { createSlice } from "@reduxjs/toolkit";
import { inventoryMiddleWare } from "./assetsMiddleware";

const inventoryInitialState: any = {
  isLoading: false,
  error: "",
  data: [],
};

const inventoryReducer = createSlice({
  name: "inventory_get",
  initialState: inventoryInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(inventoryMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(inventoryMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(inventoryMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export const inventoryReducers = inventoryReducer.reducer;
