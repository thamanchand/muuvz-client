/*
 *
 * ResroucePage reducer
 *
 */

import { fromJS } from 'immutable';

import {
  ON_VANLIST_LOAD,
  ON_VANLIST_LOAD_SUCCESS,
  ON_VANLIST_LOAD_FAILURE,
} from './constants';


export const initialState = fromJS({
  vanList: [],
  loading: false,
});

function vanListReducer(state = initialState, action) {
  switch (action.type) {
    case ON_VANLIST_LOAD:
      return state
        .set('vanList', fromJS([]))
        .set('loading', true);

    case ON_VANLIST_LOAD_SUCCESS:
      return state
        .set('vanList', action.vanList)
        .set('isLoading', false);

    case ON_VANLIST_LOAD_FAILURE:
      return state.set('error', fromJS(action.error))

    default:
      return state;
  }
}

export default vanListReducer;
