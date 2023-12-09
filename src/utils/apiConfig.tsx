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
  const result = `http://18.223.3.5/${url}`;
  return result;
};
export const authFetchUrl = (url: string) => {
  const result = `http://18.223.3.5/auth/${url}`;
  return result;
};

export const proceduresFetchUrl = (url: string) => {
  const result = `http://3.144.239.238/${url}`;
  return result;
};

export const moreInfoFetchUrl = (url: string) => {
  const result = `http://18.216.98.120/${url}`;
  return result;
};

export const runzFetchUrl = (url: string) => {
  const result = `http://3.129.9.211/${url}`;
  return result;
};

export const chartFetchUrl = (url: string) => {
  const result = `http://18.188.250.192/${url}`;
  return result;
};

export const assetFetchUrl = (url: string) => {
  const result = `http://3.142.69.67/${url}`;
  return result;
};
