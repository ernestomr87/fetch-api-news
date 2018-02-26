import { takeEvery, call, put } from "redux-saga/effects";
import { getNews } from "./api";
import { FETCH_NEWS_REQUEST } from "./constants";
import { fetchNewsResponse } from "./actions";

function* fetchNewsSaga(action) {
  try {
    const { data } = yield call(getNews, action.payload.query);
    yield put(fetchNewsResponse(data));
  } catch (error) {
    yield put(fetchNewsResponse(error));
  }
}

export default function* watchNewsSaga() {
  yield takeEvery(FETCH_NEWS_REQUEST, fetchNewsSaga);
}
