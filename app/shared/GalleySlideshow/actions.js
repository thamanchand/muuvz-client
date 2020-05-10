import {
  ON_RESOURDE_COVER_DELETE,
  ON_RESOURDE_COVER_DELETE_SUCCESS,
  ON_RESOURDE_COVER_DELETE_FAILED,

} from './constants';

export const onResourceCoverDelete = (coverId) => ({
  type: ON_RESOURDE_COVER_DELETE,
  coverId,
});

export const onResourceCoverDeleteSuccess = () => ({
  type: ON_RESOURDE_COVER_DELETE_SUCCESS,
});

export const onResourceCoverDeleteFailed = (error) => ({
  type: ON_RESOURDE_COVER_DELETE_FAILED,
  error,
});
