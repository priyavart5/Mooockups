// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import previewReducer from './slices/previewSlice';
import importReducer from './slices/importSlice';

export const store = configureStore({
  reducer: {
    preview: previewReducer,
    import: importReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
