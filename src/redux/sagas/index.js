import { all } from "redux-saga/effects";
import { watchFetchRepos } from "./reposSaga";

export default function* rootSaga() {
	yield all([watchFetchRepos()]);
}
