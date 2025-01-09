// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';

// Import MockFit Slices

// Import MockLab Slices
import dockReducer from './mockLab-slices/dockSlice';
import importReducer from './mockLab-slices/importSlice';
import mockLabReducer from './mockLab-slices/mockLabSlice';

export const store = configureStore({
  reducer: {
    // MockFit Reducers

    // MockLab Reducers
    dock: dockReducer,
    import: importReducer,
    mockLab: mockLabReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
