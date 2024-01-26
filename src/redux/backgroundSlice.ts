import { createSlice } from '@reduxjs/toolkit';

interface BackgroundSlice {
  backgroundSrc: string;
  backgroundDarkness: number;
}

const initialState: BackgroundSlice = {
  backgroundSrc: '',
  backgroundDarkness: 0,
};

const backgroundSlice = createSlice({
  name: 'background',
  initialState,
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
