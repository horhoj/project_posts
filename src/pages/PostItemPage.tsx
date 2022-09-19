import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { EditPostItemForm } from '../features/Posts/EditPostItemForm';

export const PostItemPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>id error!</div>;
  }

  const idInt = Number.parseInt(id);

  const check = Number.isInteger(idInt);

  if (!check) {
    return <div>id is not number!</div>;
  }

  return <EditPostItemForm id={Number.parseInt(id)} />;
};
