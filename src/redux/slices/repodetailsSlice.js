import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	repoDetails: [],
	loading: false,
	error: false,
};

const repoDetailsSlice = createSlice({
	name: "repoDetails",
	initialState,
	reducers: {
		fetchRepoDetailsRequest: (state, action) => {
			state.loading = true;
			state.error = false;
		},
		fetchRepoDetailsSuccess: (state, action) => {
			state.loading = false;
			state.error = false;

			state.repoDetails = action.payload.repoDetails;
		},
		fetchRepoDetailsFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload.error;
		},
		clearErrorMessage: (state, action) => {
			state.error = false;
		},
	},
});

export const {
	fetchRepoDetailsRequest,
	fetchRepoDetailsSuccess,
	fetchRepoDetailsFailure,
	clearErrorMessage,
} = repoDetailsSlice.actions;
export default repoDetailsSlice.reducer;
