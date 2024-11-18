import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PreviewState {
  isPreview: boolean;
}

const initialState: PreviewState = {
  isPreview: false, // default to false (not in preview mode)
};

const previewSlice = createSlice({
  name: 'preview',
  initialState,
  reducers: {
    togglePreview: (state) => {
      state.isPreview = !state.isPreview;
    },
    setPreview: (state, action: PayloadAction<boolean>) => {
      state.isPreview = action.payload;
    },
  },
});

export const { togglePreview, setPreview } = previewSlice.actions;
export default previewSlice.reducer;
