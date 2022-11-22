import {
  FC,
} from 'react';
import {
  Todo,
  useTodoDelete,
} from './useTodos';

interface DeleteItemProps {
  id: Todo['id']
}

export const DeleteItem: FC<DeleteItemProps> = ({
  id,
}) => {
  const onDelete = useTodoDelete(id);
  return (
    <button type="button" onClick={onDelete}>Delete</button>
  );
};
