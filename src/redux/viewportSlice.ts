import { createSlice } from '@reduxjs/toolkit';

interface ViewportSlice {
  width: number;
  height: number;
  showHeader: boolean;
}

const initialState: ViewportSlice = {
  width: 50,
  height: 50,
  showHeader: false,
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
    showHeaderUpdate(state, action) {
      if (action.payload === true) {
        document.getElementById('header')!.style.display = 'none';
      } else {
        document.getElementById('header')!.style.display = 'flex';
      }
      state.showHeader = action.payload;
    },
  },
});

export const { widthUpdate, heightUpdate, showHeaderUpdate } = viewportSlice.actions;

export default viewportSlice.reducer;
