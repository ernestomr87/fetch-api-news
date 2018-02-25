import { createSelector } from "reselect";

const selectSourcesDomain = () => state => state.sources;

const makeSelectSources = id =>
  createSelector(selectSourcesDomain(), substate => {
    if (!substate) return undefined;

    return substate.data;
  });

export default selectSourcesDomain;
export { makeSelectSources };
