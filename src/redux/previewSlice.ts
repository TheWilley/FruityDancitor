import { createSlice } from '@reduxjs/toolkit';

interface PreviewSlice {
  fps: number;
}

const initialState: PreviewSlice = {
  fps: 1,
};

const previewSlice = createSlice({
  name: 'preview',
  initialState,
  reducers: {
    fpsUpdate(state, action) {
      state.fps = action.payload;
    },
  },
});

export const { fpsUpdate } = previewSlice.actions;

export default previewSlice.reducer;
