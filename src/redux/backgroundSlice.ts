import { createSlice } from '@reduxjs/toolkit';

const backgroundSlice = createSlice({
  name: 'background',
  initialState: {
    backgroundSrc: '',
    backgroundDarkness: 0,
  },
  reducers: {
    backgroundSrcUpdate(state, action) {
      state.backgroundSrc = action.payload;
    },
    backgroundDarknessUpdate(state, action) {
      state.backgroundDarkness = action.payload;
    },
  },
});
export const { backgroundDarknessUpdate, backgroundSrcUpdate } = backgroundSlice.actions;

export default backgroundSlice.reducer;
