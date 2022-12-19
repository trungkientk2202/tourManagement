import { createSelector } from 'reselect';

const media = (state) => state.media;

const selectMedia = createSelector([media], (media) => media.media);

export const selectFile = createSelector([media], (media) => media.media?.file);

export default selectMedia;
