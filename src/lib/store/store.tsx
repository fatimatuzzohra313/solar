'use client'
import { configureStore } from '@reduxjs/toolkit';
import { 
  persistReducer, 
  persistStore, 
  FLUSH, 
  REHYDRATE, 
  PAUSE, 
  PERSIST, 
  PURGE, 
  REGISTER 
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../feature/auth/authSlice';
import { baseApiSlice } from './apiSlice';
import itemReducer from '../feature/item/itemSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth' , "token"], 
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [baseApiSlice.reducerPath]: baseApiSlice.reducer,
    auth: persistedAuthReducer,
    items: itemReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApiSlice.middleware),
  
  // Optional: Add this to help with hydration issues
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;