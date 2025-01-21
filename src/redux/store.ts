// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';

import { withUndoRedo } from './undoRedo';

// Import MockFit Slices
import mockFitReducer from './mockFit-slices/mockFitSlice';

// Import MockLab Slices
import dockReducer from './mockLab-slices/dockSlice';
import importReducer from './mockLab-slices/importSlice';
import mockLabReducer from './mockLab-slices/mockLabSlice';

export const store = configureStore({
  reducer: {
    // MockFit Reducers
    mockFit: withUndoRedo(mockFitReducer),
    
    // MockLab Reducers
    dock: withUndoRedo(dockReducer),
    import: withUndoRedo(importReducer),
    mockLab: withUndoRedo(mockLabReducer),
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
