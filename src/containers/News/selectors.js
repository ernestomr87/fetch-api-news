import { createSelector } from "reselect";

const selectNewsDomain = () => state => state.news;

const makeSelectNews = () =>
  createSelector(selectNewsDomain(), substate => {
    if (!substate) return undefined;
    return substate;
  });

export default selectNewsDomain;
export { makeSelectNews };
