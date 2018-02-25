import { createSelector } from "reselect";

const selectSourcesDomain = () => state => state.sources;

const makeSelectSources = () =>
  createSelector(selectSourcesDomain(), substate => {
    if (!substate) return undefined;
    return substate;
  });

export default selectSourcesDomain;
export { makeSelectSources };
