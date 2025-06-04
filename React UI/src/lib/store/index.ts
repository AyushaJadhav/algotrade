
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import editorReducer from './editorSlice';

export const store = configureStore({
  reducer: {
    editor: editorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore date objects in actions
        ignoredActionPaths: ['payload.value', 'payload.initialValue'],
        ignoredPaths: ['editor.fields', 'editor.editHistory'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
