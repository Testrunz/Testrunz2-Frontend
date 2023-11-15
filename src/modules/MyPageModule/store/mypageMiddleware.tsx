import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  moreInfoUserApi,
  moreInfoListApi,
  moreInfoApi,
} from "../../../routes/apiRoutes";
import {
  MORE_INFO,
  MORE_INFO_LIST,
  MORE_INFO_USER,
} from "../../../redux/actions";
import { MoreInfoPayload } from "./mypage.types";

export const moreInfoListMiddleWare = createAsyncThunk(
  MORE_INFO_LIST,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(moreInfoListApi);
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);

export const moreInfoUserMiddleWare = createAsyncThunk(
  MORE_INFO_USER,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(moreInfoUserApi);
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);

export const moreInfoMiddleWare = createAsyncThunk(
  MORE_INFO,
  async (
    {
      activeStatus,
      imageUrl,
      firstname,
      lastname,
      email,
      organization,
      department,
      labtype,
    }: MoreInfoPayload,
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.patch(moreInfoApi, {
        activeStatus,
        imageUrl,
        firstname,
        lastname,
        email,
        organization,
        department,
        labtype,
      });
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);
