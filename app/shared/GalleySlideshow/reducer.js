/*
 *
 * GallerySlideShow reducer
 *
 */

import { fromJS } from 'immutable';

import {
  ON_RESOURDE_COVER_DELETE,
  ON_RESOURDE_COVER_DELETE_SUCCESS,
  ON_RESOURDE_COVER_DELETE_FAILED,
} from './constants';


export const initialState = fromJS({
  isCoverDeleted: false,
});

function GallerySlideShowReducer(state = initialState, action) {
  switch (action.type) {
    case ON_RESOURDE_COVER_DELETE:
      return state
        .set('isCoverDeleted', false);

    case ON_RESOURDE_COVER_DELETE_SUCCESS:
      return state
        .set('isCoverDeleted', true);

    case ON_RESOURDE_COVER_DELETE_FAILED:
      return state
        .set('error', fromJS(action.error))
        .set('isCoverDeleted', false);

    default:
      return state;
  }
}

export default GallerySlideShowReducer;
