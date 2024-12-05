// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import previewReducer from './slices/previewSlice';
import importReducer from './slices/importSlice';
import mockLabReducer from './slices/mockLabSlice';
import mockLabEditorSlice from './slices/mockLabEditorSlice';

export const store = configureStore({
  reducer: {
    preview: previewReducer,
    import: importReducer,
    mockLab: mockLabReducer,
    mockLabEditor: mockLabEditorSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
