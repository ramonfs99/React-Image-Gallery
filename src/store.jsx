import { configureStore } from "@reduxjs/toolkit";
import imageSlice from './slices/ImageSlice';

export const store = configureStore({
    reducer: {
      images: imageSlice,
    },
  });