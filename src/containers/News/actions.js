import { createAction } from "redux-actions";
import { FETCH_NEWS_REQUEST, FETCH_NEWS_RESPONE } from "./constants";

export const fetchNewsRequest = createAction(FETCH_NEWS_REQUEST);
export const fetchNewsResponse = createAction(FETCH_NEWS_RESPONE);
