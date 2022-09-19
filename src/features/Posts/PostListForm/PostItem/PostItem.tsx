import { FC, Fragment } from 'react';
import { Post } from '../../../../api/postsTypes';
import { getUUID } from '../../../../utils/getUUID';
import styles from './PostItem.module.scss';

interface PostItemProps {
  post: Post;
  index: number;
}

export const PostItem: FC<PostItemProps> = ({ post, index }) => {
  const x = new Array(post.reactions).fill(null);

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>{`${index}. ${post.title}`}</div>
      <div className={styles.reaction}>
        <div className={styles.reactionLabel}>reaction:</div>
        <div>
          {x.map((_) => (
            <Fragment key={getUUID()}>*</Fragment>
          ))}
        </div>
      </div>
      <div className={styles.body}>{post.body}</div>
    </div>
  );
};
