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
    [fetchSourcesRequest]() {
      return [];
    },
    [fetchSourcesResponse](state, action) {
      return action.error ? state : state.concat(action.payload);
    }
  },
  []
);

const error = handleActions(
  {
    [fetchSourcesRequest]() {
      return false;
    },
    [fetchSourcesResponse](state, action) {
      return action.error ? action.payload : false;
    }
  },
  false
);

export default combineReducers({
  loading,
  data,
  error
});
