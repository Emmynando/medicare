import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { supportChatApi } from "./SupportApi";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

// Use browser storage or noop storage
// const persistStorage = isBrowser() ? storage : noopStorage;

// Persist config for userApi
// const userApiPersistConfig = {
//   key: "userApi",
//   storage: persistStorage,
//   whitelist: ["queries"],
// };

// const persistedReducer = persistReducer(persistConfig, supportChatReducer);

export const store = configureStore({
  reducer: {
    [supportChatApi.reducerPath]: supportChatApi.reducer, // Unpersisted
    // [userApi.reducerPath]: persistedUserApiReducer, // Persisted
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PURGE",
        ],
        // ignoredPaths: ["userApi"],
      },
    }).concat(supportChatApi.middleware),
});

// Export types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// Export the store to use in your app
export const persistor = persistStore(store);
