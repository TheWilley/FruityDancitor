import { createSlice } from '@reduxjs/toolkit';

const backgroundSlice = createSlice({
  name: 'background',
  initialState: {
    backgroundSrc: '',
    backgroundDarkness: 0,
  },
  reducers: {
    adjustedBackgroundSrc(state, action) {
      state.backgroundSrc = action.payload;
    },
    adjustedBackgroundDarkness(state, action) {
      state.backgroundDarkness = action.payload;
    },
  },
});
export const { adjustedBackgroundDarkness, adjustedBackgroundSrc } =
  backgroundSlice.actions;

export default backgroundSlice.reducer;
