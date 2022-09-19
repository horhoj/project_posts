import { FC } from 'react';
import { postsSlice } from '../postsSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import styles from './PostListForm.module.scss';
import { PostItem } from './PostItem';

export const PostListForm: FC = () => {
  postsSlice.hooks.usePostListForm();

  const dispatch = useAppDispatch();
  const fetchPostListRequest = useAppSelector(
    postsSlice.selectors.getFetchPostListRequest,
  );

  const limit = useAppSelector(postsSlice.selectors.getLimit);
  const skip = useAppSelector(postsSlice.selectors.getSkip);

  const handleNextPage = () => {
    dispatch(postsSlice.thunks.nextPageThunk());
  };

  const handlePrevPage = () => {
    dispatch(postsSlice.thunks.prevPageThunk());
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.toolPanel}>
        <button className={styles.toolPanelButton} onClick={handlePrevPage}>
          prev
        </button>
        <div>
          <div>{`limit: ${limit}`}</div>
          <div>{`skip: ${skip}`}</div>
        </div>
        <button className={styles.toolPanelButton} onClick={handleNextPage}>
          next
        </button>
      </div>
      <div className={styles.postList}>
        {fetchPostListRequest.data &&
          fetchPostListRequest.data.posts.map((post, index) => (
            <PostItem post={post} key={post.id} index={index + 1 + skip} />
          ))}
      </div>
    </div>
  );
};
