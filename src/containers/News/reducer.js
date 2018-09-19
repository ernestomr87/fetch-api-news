import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { fetchNewsRequest, fetchNewsResponse } from "./actions";

const loading = handleActions(
  {
    [fetchNewsRequest]() {
      return true;
    },

    [fetchNewsResponse]() {
      return false;
    }
  },
  false
);

const data = handleActions(
  {
    [fetchNewsRequest]() {
      return [];
    },
    [fetchNewsResponse](state, action) {
      return action.error ? state : state.concat(action.payload);
    }
  },
  []
);

const error = handleActions(
  {
    [fetchNewsRequest]() {
      return false;
    },
    [fetchNewsResponse](state, action) {
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
