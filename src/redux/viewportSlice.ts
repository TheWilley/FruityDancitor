import { createSlice } from '@reduxjs/toolkit';

interface ViewportSlice {
  width: number;
  height: number;
}

const initialState: ViewportSlice = {
  width: 50,
  height: 50,
};

const viewportSlice = createSlice({
  name: 'viewport',
  initialState,
  reducers: {
    widthUpdate(state, action) {
      state.width = action.payload;
    },
    heightUpdate(state, action) {
      state.height = action.payload;
    },
  },
});

export const { widthUpdate, heightUpdate } = viewportSlice.actions;

export default viewportSlice.reducer;
