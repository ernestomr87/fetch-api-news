import { createAction } from "redux-actions";
import { FETCH_SOURCES_REQUEST, FETCH_SOURCES_RESPONE } from "./constants";

export const fetchSourcesRequest = createAction(FETCH_SOURCES_REQUEST);
export const fetchSourcesResponse = createAction(FETCH_SOURCES_RESPONE);
