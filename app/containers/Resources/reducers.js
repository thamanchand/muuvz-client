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
  ON_VAN_SAVE,
  ON_VAN_SAVE_SUCCESS,
  ON_VAN_SAVE_FAILED,
  ON_RESOURCE_DELETE,
  ON_RESOURCE_DELETE_SUCCESS,
  ON_RESOURCE_DELETE_FAILED,
  ON_RESOURCE_COVER_DELETE,
  ON_RESOURCE_COVER_DELETE_SUCCESS,
  ON_RESOURCE_COVER_DELETE_FAILED,
} from './constants';


export const initialState = fromJS({
  vanList: [],
  loading: false,
  isVanInfoSaved: false,
});

function vanListReducer(state = initialState, action) {
  switch (action.type) {
    case ON_VANLIST_LOAD:
      return state
        .set('vanList', fromJS([]))
        .set('loading', true);

    case ON_VANLIST_LOAD_SUCCESS:
      return state
        .set('vanList', fromJS(action.vanList))
        .set('isLoading', false);

    case ON_VANLIST_LOAD_FAILURE:
      return state.set('error', fromJS(action.error))

    case ON_VAN_SAVE:
      return state
        .set('isVanInfoSaved', false);

    case ON_VAN_SAVE_SUCCESS:
      return state
        .set('isVanInfoSaved', true)
        .update('vanList', (vanList) => vanList.push(fromJS(action.vanList)));

    case ON_VAN_SAVE_FAILED:
      return state
        .set('error', fromJS(action.error))
        .set('isVanInfoSaved', false);

    case ON_RESOURCE_DELETE:
      return state;

    case ON_RESOURCE_DELETE_SUCCESS:
      return state.deleteIn(
        [
          'vanList',
          state
            .get('vanList')
            .findIndex(
              van => van.get('_id') === fromJS(action.deletedResourceId)),
        ],
      );

    case ON_RESOURCE_DELETE_FAILED:
      return state
        .set('error', fromJS(action.error))
        .set('isVanInfoSaved', false);

    case ON_RESOURCE_COVER_DELETE:
      return state
        .set('isCoverDeleted', false);

    case ON_RESOURCE_COVER_DELETE_SUCCESS:
      return state
        .set('isCoverDeleted', true);

    case ON_RESOURCE_COVER_DELETE_FAILED:
      return state
        .set('error', fromJS(action.error))
        .set('isCoverDeleted', false);

    default:
      return state;
  }
}

export default vanListReducer;
