import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AUTH_CREATE,
  AUTH_DISABLE,
  GET_SETTINGS,
  GET_USER_LIST,
  GET_USER_LIST_UPDATE,
  POST_SETTINGS,
  UPDATE_SETTINGS,
} from "../../../redux/actions";
import {
  authCreateApi,
  getUserListApi,
  getUserListUpdateApi,
  settingApi,
  settingUpdateApi,
  moreinfoDisableuserApi,
} from "../../../routes/apiRoutes";
import axios from "axios";

export const getSettingMiddleWare = createAsyncThunk(
  GET_SETTINGS,
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(settingApi(id));
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);

export const postSettingMiddleWare = createAsyncThunk(
  POST_SETTINGS,
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(settingUpdateApi(id));
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);

export const updateSettingMiddleWare = createAsyncThunk(
  UPDATE_SETTINGS,
  async (
    {
      id,
      notification,
      roleSetting,
    }: { id: string; notification?: any; roleSetting?: any },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.patch(settingUpdateApi(id), {
        notification,
        roleSetting,
      });
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);

export const getUserListMiddleWare = createAsyncThunk(
  GET_USER_LIST,
  async (
    {
      department,
      labtype,
      organization,
      role,
      activeStatus,
      createdAt,
    }: {
      department?: string;
      labtype?: string;
      organization?: string;
      role?: string;
      activeStatus?: any;
      createdAt?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.get(getUserListApi, {
        params: {
          department,
          labtype,
          organization,
          role,
          activeStatus,
          createdAt,
        },
      });
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);

export const getUserListUpdateMiddleWare = createAsyncThunk(
  GET_USER_LIST_UPDATE,
  async (
    {
      id,
      activeStatus,
      firstname,
      lastname,
      email,
      organization,
      department,
      labtype,
      role,
    }: {
      id: string;
      activeStatus?: boolean;
      firstname?: any;
      lastname?: any;
      email?: any;
      organization?: any;
      department?: any;
      labtype?: any;
      role?: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.patch(getUserListUpdateApi(id), {
        firstname,
        lastname,
        email,
        organization,
        department,
        labtype,
        role,
        activeStatus,
      });
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);

export const authCreateMiddleWare = createAsyncThunk(
  AUTH_CREATE,
  async (
    {
      firstname,
      lastname,
      email,
      organization,
      department,
      labtype,
      role,
      activeStatus,
    }: {
      firstname: string;
      lastname: string;
      email: string;
      organization: string;
      department: string[];
      labtype: string[];
      role: string;
      activeStatus: boolean;
    },
    { rejectWithValue }
  ) => {
    try {
      const data: any = await axios.post(authCreateApi, {
        lastname,
        firstname,
        email,
        labtype,
        organization,
        department,
        role,
        activeStatus,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        name: `${firstname} ${lastname}`,
      });
      if (data.data) {
        return data.data;
      } else {
        return data?.response?.data;
      }
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);

export const authDisableMiddleWare = createAsyncThunk(
  AUTH_DISABLE,
  async ({ ids }: { ids: string[] }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(moreinfoDisableuserApi, {
        ids,
      });
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);
