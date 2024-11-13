import { configureStore } from "@reduxjs/toolkit";
import { imageReducer } from './slices/ImageSlice';
import { searchReducer } from "./slices/SearchSlice";

export const store = configureStore({
    reducer: {
      images: imageReducer,
      search: searchReducer,
    },
  });