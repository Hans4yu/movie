import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch trending data
export const fetchTrendingData = createAsyncThunk(
  'trending/fetchTrendingData',
  async (timeWindow = 'day') => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/all/${timeWindow}?api_key=${apiKey}`
    );
    const data = await response.json();
    return data.results;
  }
);

// Slice to manage trending data state
const trendingSlice = createSlice({
  name: 'trending',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTrendingData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTrendingData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default trendingSlice.reducer;
