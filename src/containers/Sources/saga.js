import { takeEvery, call, put } from "redux-saga/effects";
import { getSources } from "./api";
import { FETCH_SOURCES_REQUEST } from "./constants";
import { fetchSourcesResponse } from "./actions";

function* fetchMerchantsSaga() {
  try {
    const { data } = yield call(getSources);

    yield put(fetchSourcesResponse(data));
  } catch (error) {
    yield put(fetchSourcesResponse(error));
  }
}

export default function* watchMerchantsSaga() {
  yield takeEvery(FETCH_SOURCES_REQUEST, fetchMerchantsSaga);
}
