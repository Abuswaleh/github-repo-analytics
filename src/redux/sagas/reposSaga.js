import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {
	fetchReposRequest,
	fetchReposSuccess,
	fetchReposFailure,
} from "../slices/repoSlice";
import {
	fetchRepoDetailsRequest,
	fetchRepoDetailsSuccess,
	fetchRepoDetailsFailure,
} from "../slices/repodetailsSlice";
import { getStartDate } from "../../utils/dateUtils";

const GITHUB_API_URL = "https://api.github.com";

function* fetchReposSaga(action) {
	const { period, page } = action.payload;

	const startDate = getStartDate(period);
	try {
		const response = yield call(
			axios.get,
			`${GITHUB_API_URL}/search/repositories?q=created:>${startDate}&sort=stars&order=desc&page=${page}`
		);
		yield put(
			fetchReposSuccess({ period, page, repos: response.data.items })
		);
	} catch (error) {
		console.error("Error fetching repos: ", error);
		yield put(fetchReposFailure({ error: error.message }));
	}
}

function* fetchRepoDetailsSaga(action) {
	const { owner, repo } = action.payload;

	try {
		const contributors = yield call(
			axios.get,
			`${GITHUB_API_URL}/repos/${owner}/${repo}/stats/contributors`
		);
		console.log(contributors.data)
		// sometime no data is there, only empty object
		if (Array.isArray(contributors.data)) {
			yield put(fetchRepoDetailsSuccess({ repoDetails: contributors.data }));
		} else {
			yield put(
				fetchRepoDetailsFailure({
					error: "Something went wrong, try again later",
				})
			);
		}
	} catch (error) {
		console.error("Error fetching repoDetails: ", error);
		yield put(fetchRepoDetailsFailure({ error: error.message }));
	}
}

export function* watchFetchRepos() {
	yield takeLatest(fetchReposRequest.type, fetchReposSaga);
	yield takeLatest(fetchRepoDetailsRequest.type, fetchRepoDetailsSaga);
}
