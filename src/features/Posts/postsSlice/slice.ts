import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestSliceStateProperty } from '../../../store/types';
import { FetchPostsResponse } from '../../../api/postsTypes';
import {
  makeRequestCaseToBuilder,
  makeRequestSliceStateProperty,
} from '../../../store/helpers';
import { LIMIT } from '../config';
import { SLICE_NAME } from './types';
import * as thunks from './thunks';

interface InitialState {
  fetchPostListRequest: RequestSliceStateProperty<FetchPostsResponse>;
  limit: number;
  skip: number;
}

const initialState: InitialState = {
  fetchPostListRequest: makeRequestSliceStateProperty<FetchPostsResponse>(),
  limit: LIMIT,
  skip: 0,
};

export const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },

    setSkip: (state, action: PayloadAction<number>) => {
      state.skip = action.payload;
    },
  },

  extraReducers: (builder) => {
    makeRequestCaseToBuilder<InitialState>(
      builder,
      thunks.fetchPostListThunks,
      'fetchPostListRequest',
    );
  },
});
