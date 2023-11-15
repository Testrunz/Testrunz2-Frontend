import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  chartApi,
  getRunzListApi,
  getRunzListDetails,
} from "../../../routes/apiRoutes";
import {
  CHART_ADD,
  RUNZ_CREATE,
  RUNZ_GET_DETAILS,
  RUNZ_GET_LIST,
  RUNZ_UPDATE,
} from "../../../redux/actions";

export const getRunzListMiddleWare = createAsyncThunk(
  RUNZ_GET_LIST,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(getRunzListApi);
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);

export const getRunzCreateMiddleWare = createAsyncThunk(
  RUNZ_CREATE,
  async (
    {
      procedureId,
      procedurename,
      testobjective,
      dueDate,
      assignTo,
      department,
      labType,
      createdBy,
      datas,
      organization,
    }: {
      procedureId: string;
      procedurename: string;
      testobjective: string;
      dueDate: string;
      datas: string;
      organization: string;
      assignTo: [
        {
          userId: String;
          date: String;
        }
      ];
      department: any;
      labType: any;
      createdBy: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(getRunzListApi, {
        procedureId,
        procedurename,
        testobjective,
        dueDate,
        assignTo,
        department,
        labType,
        createdBy,
        datas,
        organization,
      });
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);

export const getRunzListDetailsMiddleWare = createAsyncThunk(
  RUNZ_GET_DETAILS,
  async ({ id }: { id: any }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(getRunzListDetails(id));
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);

export const getRunzUpdatesMiddleWare = createAsyncThunk(
  RUNZ_UPDATE,
  async (
    {
      id,
      status,
      procedureId,
      procedurename,
      testobjective,
      dueDate,
      assignTo,
      datas,
      expresult,
      remark,
      table,
    }: {
      id: any;
      status?: string;
      procedureId?: string;
      procedurename?: string;
      testobjective?: string;
      dueDate?: string;
      assignTo?: string;
      datas?: string;
      remark?: string;
      expresult?: string;
      table?: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.patch(getRunzListDetails(id), {
        status,
        procedureId,
        procedurename,
        testobjective,
        dueDate,
        assignTo,
        datas,
        remark,
        expresult,
        table,
      });
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);

export const chartPostMiddleWare = createAsyncThunk(
  CHART_ADD,
  async (
    { runzId, values }: { runzId: string; values: string[] },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(chartApi, {
        runzId,
        values,
      });
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);
