import { RequestSliceStateProperty, RootState } from '../../../store/types';
import { FetchPostsResponse } from '../../../api/postsTypes';

export const getIsLoading = (state: RootState): boolean =>
  state.posts.fetchPostListRequest.isLoading;

export const getFetchPostListRequest = (
  state: RootState,
): RequestSliceStateProperty<FetchPostsResponse> =>
  state.posts.fetchPostListRequest;

export const getLimit = (state: RootState): number => state.posts.limit;
export const getSkip = (state: RootState): number => state.posts.skip;
