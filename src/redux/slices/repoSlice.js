import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  repos: [],
  loading: false,
  error: false,
  period: 30,
  page: 1,
};

const repoSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    fetchReposRequest: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    fetchReposSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.page = action.payload.page;
      state.period = action.payload.period;

      if (action.payload.page === 1) {
        state.repos = action.payload.repos;
      } else {
        state.repos = [...state.repos, ...action.payload.repos];
      }
    },
    fetchReposFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    clearErrorMessage : (state, action)=>{
      state.error = false
    }
  },
});

export const { fetchReposRequest, fetchReposSuccess, fetchReposFailure, clearErrorMessage } = repoSlice.actions;
export default repoSlice.reducer;
