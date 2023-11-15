import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  PROCEDURE_CREATE,
  PROCEDURE_DELETE,
  PROCEDURE_DUPLICATE,
  PROCEDURE_ID_LIST,
  PROCEDURE_LIST,
  PROCEDURE_UPDATE,
} from "../../../redux/actions";
import axios from "axios";
import {
  duplicateProcedureApi,
  procedureApi,
  procedureByIdApi,
  procedureUpdateAndDeleteApi,
} from "../../../routes/apiRoutes";

export const procedureMiddleWare = createAsyncThunk(
  PROCEDURE_LIST,
  async (
    {
      department,
      labtype,
      id,
      createdOn,
      createdBy,
    }: {
      department?: string;
      labtype?: string;
      id?: string;
      createdOn?: string;
      createdBy?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.get(procedureApi, {
        params: {
          department,
          labtype,
          id,
          createdBy,
          createdOn,
        },
      });
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);

export const procedureCreateMiddleWare = createAsyncThunk(
  PROCEDURE_CREATE,
  async (
    {
      title,
      html,
      createdBy,
    }: { title: string; html: string; createdBy: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(procedureApi, {
        title,
        html,
        createdBy,
      });
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);

export const procedureByIdMiddleWare = createAsyncThunk(
  PROCEDURE_ID_LIST,
  async ({ id }: { id: any }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(procedureByIdApi(id));
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);

export const procedureUpdateMiddleWare = createAsyncThunk(
  PROCEDURE_UPDATE,
  async (
    { id, html, title }: { id: any; title: any; html: any },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.patch(procedureUpdateAndDeleteApi(id), {
        title,
        html,
      });
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);

export const procedureDeleteMiddleWare = createAsyncThunk(
  PROCEDURE_DELETE,
  async ({ ids }: { ids: string[] }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(procedureApi, {
        data: { ids },
      });
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);

export const duplicateProcedureMiddleWare = createAsyncThunk(
  PROCEDURE_DUPLICATE,
  async ({ ids }: { ids: string[] }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(duplicateProcedureApi, {
        ids,
      });
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);
