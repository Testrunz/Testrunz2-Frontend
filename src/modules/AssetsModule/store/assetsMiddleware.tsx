import axios from "axios";
import { inventoriesyApi, inventoryApi } from "../../../routes/apiRoutes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ASSET_INVENTORY,
  ASSET_INVENTORY_CREATE,
} from "../../../redux/actions";
import { AssetsPaylod } from "./assets.types";

export const inventoryPostMiddleWare = createAsyncThunk(
  ASSET_INVENTORY_CREATE,
  async (
    {
      name,
      type,
      staticip,
      description,
      imageUrl,
      modelNo,
      serialNo,
      purchasedate,
      guarantywaranty,
      organisation,
      department,
      laboratory,
      status,
      availability,
    }: AssetsPaylod,
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(inventoryApi, {
        name,
        type,
        staticip,
        description,
        imageUrl,
        modelNo,
        serialNo,
        purchasedate,
        guarantywaranty,
        organisation,
        department,
        laboratory,
        status,
        availability,
      });
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);

export const inventoryMiddleWare = createAsyncThunk(
  ASSET_INVENTORY,
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(inventoriesyApi);
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);
