import { Reducer } from '@reduxjs/toolkit';

interface HistoryState<S> {
  past: S[];
  present: S;
  future: S[];
}

const UNDO = 'UNDO';
const REDO = 'REDO';

export const undo = () => ({ type: UNDO });
export const redo = () => ({ type: REDO });

export const withUndoRedo = <S>(reducer: Reducer<S>): Reducer<HistoryState<S>> => {
  const initialState: HistoryState<S> = {
    past: [],
    present: reducer(undefined, { type: '@@INIT' }),
    future: [],
  };

  return (state = initialState, action) => {
    const { past, present, future } = state;

    switch (action.type) {
      case UNDO: {
        if (past.length === 0) return state;

        const previous = past[past.length - 1];
        const newPast = past.slice(0, past.length - 1);

        return {
          past: newPast,
          present: previous,
          future: [present, ...future],
        };
      }

      case REDO: {
        if (future.length === 0) return state;

        const next = future[0];
        const newFuture = future.slice(1);

        return {
          past: [...past, present],
          present: next,
          future: newFuture,
        };
      }

      default: {
        // Save history only for state-changing actions
        const newPresent = reducer(present, action);
        if (newPresent === present) return state;
        return {
          past: [...past, present].slice(-200),
          present: newPresent,
          future: [],
        };
      }
    }
  };
};
