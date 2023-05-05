import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import authSlice from "./auth/authSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/lib/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import { authApi } from "./auth/authApi";
import { tasksApi } from "./tasks/tasksApi";
import tasksReducer from "./tasks/taskSlice";
import imageReducer from "./images/imageSlice";
import { imageApi } from "./images/imageApi";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "isAuthenticated"],
};

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    image: imageReducer,
    auth: persistReducer(authPersistConfig, authSlice),
    [authApi.reducerPath]: authApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [imageApi.reducerPath]: imageApi.reducer,
  },

  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware, tasksApi.middleware, imageApi.middleware),
  ],
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
