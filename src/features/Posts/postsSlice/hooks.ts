import { useEffect } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { LIMIT } from '../config';
import { postsSlice } from './index';

export const usePostListForm = (): void => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(postsSlice.thunks.reFetchPostListThunks());
  }, []);
};

export const usePostItemForm = (id: number): void => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(postsSlice.thunks.editPostThunk({ id }));
    return () => {
      dispatch(postsSlice.actions.clearFetchPostListRequest());
    };
  }, []);
};
