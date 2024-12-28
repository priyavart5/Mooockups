import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ImportState {
  file: string | null;
  fileName: string;
  width: number | null;
  height: number | null;
  type: 'image' | 'video' | null;
  duration: number | null;
}

const initialState: ImportState = {
  file: null,
  fileName: 'Import file',
  width: null,
  height: null,
  type: null,
  duration: null,
};

const importSlice = createSlice({
  name: 'import',
  initialState,
  reducers: {
    setFile: (
      state,
      action: PayloadAction<{
        file: string;
        fileName: string;
        width: number;
        height: number;
        type: 'image' | 'video';
        duration?: number;
      }>
    ) => {
      const { file, fileName, width, height, type, duration } = action.payload;
      state.file = file;
      state.fileName = fileName;
      state.width = width;
      state.height = height;
      state.type = type;
      state.duration = type === 'video' ? duration ?? null : null;
    },
    clearFile: (state) => {
      state.file = null;
      state.fileName = 'Import file';
      state.width = null;
      state.height = null;
      state.type = null;
      state.duration = null;
    },
  },
});

export const { setFile, clearFile } = importSlice.actions;
export default importSlice.reducer;
