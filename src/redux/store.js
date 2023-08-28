import { configureStore } from '@reduxjs/toolkit';
import facultyReducer from './slices/facultySlice';

export const store = configureStore({
    reducer: {
        faculty: facultyReducer
    },
})