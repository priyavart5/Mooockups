// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import previewReducer from './slices/previewSlice';
import importReducer from './slices/importSlice';
import mockLabReducer from './slices/mockLabSlice';

export const store = configureStore({
  reducer: {
    preview: previewReducer,
    import: importReducer,
    mockLab: mockLabReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
