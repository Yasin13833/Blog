import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
} from "redux-persist";

import storageModule from "redux-persist/lib/storage";
import auth from "./Slice/auth.js";

const storage = storageModule.default;

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user" , "token"],
};

const persistedReducer = persistReducer(
  persistConfig,
  auth
);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/RESUME",
        ],
      },
    }),
});

export const persistor = persistStore(store);