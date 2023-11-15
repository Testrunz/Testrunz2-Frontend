import {
  assetFetchUrl,
  authFetchUrl,
  chartFetchUrl,
  fetchUrl,
  moreInfoFetchUrl,
  proceduresFetchUrl,
  runzFetchUrl,
} from "../utils/apiConfig";

export const uploadApi = fetchUrl("upload");
export const settingApi = (id: string) => {
  const result = fetchUrl(`setting/${id}`);
  return result;
};
export const settingUpdateApi = (id: string) => {
  const result = fetchUrl(`setting/${id}`);
  return result;
};

export const signUpApi = authFetchUrl("register");
export const authMeApi = authFetchUrl("me");
export const googleLoginApi = authFetchUrl("googlelogin");
export const microsoftLoginApi = authFetchUrl("microsoftlogin");
export const linkedinLoginApi = authFetchUrl("linkedinlogin");
export const authCreateApi = authFetchUrl("create");

export const procedureApi = proceduresFetchUrl("procedure");
export const procedureByIdApi = (id: string) => {
  return proceduresFetchUrl(`procedure/byid/${id}`);
};
export const procedureByTitleApi = (title: string) => {
  return proceduresFetchUrl(`procedure/title/${title}`);
};
export const procedureUpdateAndDeleteApi = (id: string) => {
  return proceduresFetchUrl(`procedure/${id}`);
};
export const duplicateProcedureApi = proceduresFetchUrl(`duplicateprocedure`);

export const moreInfoListApi = moreInfoFetchUrl(`moreinfo/list`);
export const moreInfoUserApi = moreInfoFetchUrl(`moreinfo/user`);
export const moreInfoApi = moreInfoFetchUrl(`moreinfo`);
export const getUserListApi = moreInfoFetchUrl("moreinfo");
export const getUserListUpdateApi = (id: string) => {
  return moreInfoFetchUrl(`moreinfo/${id}`);
};
export const moreinfoDisableuserApi = moreInfoFetchUrl("moreinfo/disableuser");

export const getRunzListApi = runzFetchUrl("experiment");

export const getRunzListDetails = (id: string) => {
  return runzFetchUrl(`experiment/${id}`);
};

export const chartApi = chartFetchUrl("chart");

export const inventoryApi = assetFetchUrl("inventory");
export const inventoriesyApi = assetFetchUrl("inventories");
