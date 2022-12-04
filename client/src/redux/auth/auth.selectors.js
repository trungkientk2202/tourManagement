import { createSelector } from 'reselect';

const auth = (state) => state.auth;

const selectAuth = createSelector([auth], (auth) => auth);

export const selectCurrentUser = createSelector([auth], (auth) => auth.currentUser);

export default selectAuth;
