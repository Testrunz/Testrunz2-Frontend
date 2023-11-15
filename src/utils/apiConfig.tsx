import axios from "axios";
import { isEmpty } from "./validators";

export const setAuthorization = (token: string) => {
  if (!isEmpty(token)) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const fetchUrl = (url: string) => {
  const result = `https://testrunzauthserve.onrender.com/${url}`;
  return result;
};
export const authFetchUrl = (url: string) => {
  const result = `https://testrunzauthserve.onrender.com/auth/${url}`;
  return result;
};

export const proceduresFetchUrl = (url: string) => {
  const result = `https://testrunzproceserv.onrender.com/${url}`;
  return result;
};

export const moreInfoFetchUrl = (url: string) => {
  const result = `https://testrunzmoreinfoserve.onrender.com/${url}`;
  return result;
};

export const runzFetchUrl = (url: string) => {
  const result = `https://testrunzrunzserve.onrender.com/${url}`;
  return result;
};

export const chartFetchUrl = (url: string) => {
  const result = `https://testrunzchart.onrender.com/${url}`;
  return result;
};

export const assetFetchUrl = (url: string) => {
  const result = `https://testrunzassets.onrender.com/${url}`;
  return result;
};
