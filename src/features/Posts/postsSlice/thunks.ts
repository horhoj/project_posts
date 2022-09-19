import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api';
import { RootState } from '../../../store/types';
import { LIMIT } from '../config';
import { SLICE_NAME } from './types';
import { actions } from './slice';

interface FetchPostListThunks {
  limit: number;
  skip: number;
}

export const fetchPostListThunks = createAsyncThunk(
  `${SLICE_NAME}/fetchPostListThunks`,
  async ({ limit, skip }: FetchPostListThunks, { getState }) => {
    return api.posts.fetchPostList({ skip, limit });
  },
);

export const nextPageThunk = createAsyncThunk(
  `${SLICE_NAME}/nextPageThunk`,

  async (_, { getState, dispatch }) => {
    console.log(1);
    const limit = (getState() as RootState).posts.limit;
    const skip = (getState() as RootState).posts.skip + LIMIT;
    dispatch(actions.setSkip(skip));
    dispatch(fetchPostListThunks({ limit, skip }));
  },
);

export const prevPageThunk = createAsyncThunk(
  `${SLICE_NAME}/prevPageThunk`,

  async (_, { getState, dispatch }) => {
    const limit = (getState() as RootState).posts.limit;
    const skip = (getState() as RootState).posts.skip - LIMIT;
    if (skip < 0) {
      return;
    }
    dispatch(actions.setSkip(skip));
    dispatch(fetchPostListThunks({ limit, skip }));
  },
);
