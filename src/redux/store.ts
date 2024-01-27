import { configureStore } from '@reduxjs/toolkit';
import backgroundReducer from './backgroundSlice.ts';
import spriteSheetReducer from './spriteSheetSlice.ts';
import viewportReducer from './viewportSlice.ts';
import dialogReducer from './dialogSlice.ts';

const store = configureStore({
  reducer: {
    background: backgroundReducer,
    spriteSheet: spriteSheetReducer,
    viewport: viewportReducer,
    dialog: dialogReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
