import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import WalletReducer from "../store/WalletReducer";
import MushmomReducer from "../store/MushmomReducer";
import GuidePageReducer from "../store/GuidePageReducer";

const rootPersistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["mush", "wallet"],
};

const rootReducer = combineReducers({
  // 각 리듀서를 합침
  wallet: WalletReducer,
  mush: MushmomReducer,
  guide: GuidePageReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, // 합친 리듀서 연결
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default function configStore() {
  const persistor = persistStore(store);
  return { store, persistor };
}
