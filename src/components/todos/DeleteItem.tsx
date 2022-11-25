import {
  FC,
} from 'react';
import {
  Button,
} from '../style/Button';
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
    <Button
      type="button"
      onClick={onDelete}
      variant="contained"
      color="primary"
    >
      Delete
    </Button>
  );
};
