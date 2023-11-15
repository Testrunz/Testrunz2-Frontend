import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  AUTH_ME,
  AUTH_ME_UPDATE,
  GOOGLE_SIGNUP,
  MICROSOFT_SIGNIN,
  SIGNUP,
  UPLOAD,
} from "../../../redux/actions";
import {
  authMeApi,
  googleLoginApi,
  microsoftLoginApi,
  signUpApi,
  uploadApi,
} from "../../../routes/apiRoutes";
import { MoreInfoPayload } from "../../MyPageModule/store/mypage.types";

export const signUpMiddleWare = createAsyncThunk(
  SIGNUP,
  async (
    {
      email,
      password,
      name,
    }: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    delete axios.defaults.headers.common["Authorization"];
    try {
      const { data } = await axios.post(signUpApi, {
        email,
        password,
        name,
      });
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);

export const googleLoginMiddleWare = createAsyncThunk(
  GOOGLE_SIGNUP,
  async (
    {
      email,
      uid,
      name,
      timeZone,
    }: { name: string; email: string; timeZone: string; uid: string },
    { rejectWithValue }
  ) => {
    delete axios.defaults.headers.common["Authorization"];
    try {
      const { data } = await axios.post(googleLoginApi, {
        email,
        uid,
        name,
        timeZone,
      });
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);

export const microsoftLoginMiddleWare = createAsyncThunk(
  MICROSOFT_SIGNIN,
  async (
    {
      email,
      uid,
      name,
      timeZone,
    }: { name: string; email: string; timeZone: string; uid: string },
    { rejectWithValue }
  ) => {
    delete axios.defaults.headers.common["Authorization"];
    try {
      const { data } = await axios.post(microsoftLoginApi, {
        email,
        uid,
        name,
        timeZone,
      });
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);

export const authMeMiddleWare = createAsyncThunk(
  AUTH_ME,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(authMeApi);
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);

export const authMeUpdateMiddleWare = createAsyncThunk(
  AUTH_ME_UPDATE,
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
      const { data } = await axios.patch(authMeApi, {
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

export const uploadMiddleWare = createAsyncThunk(
  UPLOAD,
  async ({ formData }: { formData: any }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(uploadApi, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);
