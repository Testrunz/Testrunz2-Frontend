import { inventoryReducers } from "../modules/AssetsModule/store/assetsReducer";
import {
  authMeReducers,
  signUpReducers,
  uploadReducers,
} from "../modules/LoginModule/store/loginReducer";
import {
  moreInfoListReducers,
  moreInfoUserReducers,
  moreInfoUserUpdateReducers,
} from "../modules/MyPageModule/store/mypageReducer";
import {
  duplicateProcedureReducers,
  procedureByIDReducers,
  procedureReducers,
} from "../modules/ProceduresModule/store/proceduresReducers";
import {
  chartPostReducers,
  getRunzListDetailsReducers,
  getRunzListReducers,
  getRunzUpdatesReducers,
} from "../modules/RunzModule/store/runzReducer";
import {
  getSettingsReducers,
  getUserListReducers,
  postSettingsReducers,
  updateSettingsReducers,
} from "../modules/SettingsModule/store/settingsReducers";

export const reducers = {
  signUpReducers,
  authMeReducers,
  procedureReducers,
  moreInfoListReducers,
  moreInfoUserReducers,
  uploadReducers,
  moreInfoUserUpdateReducers,
  getSettingsReducers,
  postSettingsReducers,
  updateSettingsReducers,
  getUserListReducers,
  procedureByIDReducers,
  duplicateProcedureReducers,
  getRunzListReducers,
  getRunzListDetailsReducers,
  getRunzUpdatesReducers,
  chartPostReducers,
  inventoryReducers,
};
