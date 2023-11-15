import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch, resetStore } from "../redux/store";
import { AUTH_TOKEN } from "./localStoreConst";
import Toast from "../packages/Toast/Toast";
import { isEmpty } from "./validators";

const errorMessage = (status: number) => {
  switch (status) {
    case 500:
      return `Request failed with status code 500`;
    case 400:
      return `Error while bad request: Request failed with status code 400`;
    case 404:
      return `Request failed with status code 404`;
    default:
      return null;
  }
};
export const useInterceptors = () => {
  const dispatch: AppDispatch = useDispatch();

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        window.location.reload();
        localStorage.removeItem(AUTH_TOKEN);
        dispatch(resetStore());
      } else if (errorMessage(error.response.status)) {
        Toast(
          isEmpty(error.response.data?.error)
            ? errorMessage(error.response.status)
            : error.response.data?.error,
          "LONG",
          "error"
        );
      }
      return error;
    }
  );
};
