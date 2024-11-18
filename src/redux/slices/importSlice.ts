// src/redux/slices/importSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ImportState {
  file: string | null;
  fileName: string;
  width: number | null;
  height: number | null;
}

const initialState: ImportState = {
  file: null,
  fileName: 'Import file',
  width: null,
  height: null,
};

const importSlice = createSlice({
  name: 'import',
  initialState,
  reducers: {
    // Set file details in the Redux state
    setFile: (
      state,
      action: PayloadAction<{
        file: string;
        fileName: string;
        width: number;
        height: number;
      }>
    ) => {
      const { file, fileName, width, height } = action.payload;
      state.file = file;
      state.fileName = fileName;
      state.width = width;
      state.height = height;
    },
    // Clear file from Redux state
    clearFile: (state) => {
      state.file = null;
      state.fileName = 'Import file';
      state.width = null;
      state.height = null;
    },
  },
});

// Export the actions so they can be used in components
export const { setFile, clearFile } = importSlice.actions;

// Export the reducer to be added to the store
export default importSlice.reducer;
