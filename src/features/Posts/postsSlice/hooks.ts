import { useEffect } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { LIMIT } from '../config';
import { postsSlice } from './index';

export const usePostListForm = (): null => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(postsSlice.thunks.fetchPostListThunks({ skip: 0, limit: LIMIT }));
  }, []);

  return null;
};
