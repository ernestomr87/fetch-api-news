import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { fetchSourcesRequest, fetchSourcesResponse } from "./actions";

const loading = handleActions(
  {
    [fetchSourcesRequest]() {
      return true;
    },

    [fetchSourcesResponse]() {
      return false;
    }
  },
  true
);

const data = handleActions(
  {
    [fetchSourcesResponse](state, action) {
      return action.error ? state : state.concat(action.payload);
    }
  },
  []
);

const error = handleActions(
  {
    [fetchSourcesResponse](state, action) {
      return action.error ? action.payload : null;
    }
  },
  null
);

export default combineReducers({
  loading,
  data,
  error
});
