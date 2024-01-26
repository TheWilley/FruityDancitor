import { configureStore } from '@reduxjs/toolkit';
import backgroundReducer from './backgroundSlice.ts';

const store = configureStore({
  reducer: {
    background: backgroundReducer,
  },
});

export type IRootState = ReturnType<typeof store.getState>;
export default store;
