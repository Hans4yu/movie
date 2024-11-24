import { configureStore } from '@reduxjs/toolkit';
import trendingReducer from './slices/trendingSlice'; // The slice for managing trending data

const store = configureStore({
  reducer: {
    trending: trendingReducer, // Add the trending reducer here
  },
});

export default store;
