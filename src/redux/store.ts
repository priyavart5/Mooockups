// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import dockReducer from './slices/dockSlice';
import importReducer from './slices/importSlice';
import mockLabReducer from './slices/mockLabSlice';

export const store = configureStore({
  reducer: {
    dock: dockReducer,
    import: importReducer,
    mockLab: mockLabReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
