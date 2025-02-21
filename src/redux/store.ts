import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";

import spaceXSlice from "./slice/spaceXSlice";

// Persist Config
const persistConfig = {
  key: "root",
  storage, // Stores data in localStorage
};

// Combine Reducers (useful if you have multiple slices)
const rootReducer = combineReducers({
  spaceXLaunches: spaceXSlice,
});

// Create Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
