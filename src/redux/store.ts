import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reducers } from "./mainreducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const resetStoreActionType = "main/resetStore";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    "signUpReducers",
    "procedureReducers",
    "moreInfoListReducers",
    "moreInfoUserReducers",
    "uploadReducers",
    "moreInfoUserUpdateReducers",
    "getSettingsReducers",
    "postSettingsReducers",
    "updateSettingsReducers",
    "getUserListReducers",
    "procedureByIDReducers",
    "duplicateProcedureReducers",
    "getRunzListReducers",
    "getRunzListDetailsReducers",
    "getRunzUpdatesReducers",
    "chartPostReducers",
    "inventoryReducers",
  ],
};

const combinedReducer = combineReducers(reducers);

export const rootReducer = (state: any, action: any) => {
  if (action.type === resetStoreActionType) {
    state = undefined; // eslint-disable-line
  }
  return combinedReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export const resetStore = () => {
  store.dispatch({ type: resetStoreActionType });
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export default store;
