import {
  FC,
} from 'react';
import {
  Card,
} from '../layout/Card';
import {
  ListItem,
} from './ListItem';
import {
  useTodosListIds,
} from './useTodos';

export const List: FC = () => {
  const ids = useTodosListIds();
  return (
    <Card>
      {ids.map((id) => (
        <ListItem
          key={id}
          todo={id}
        />
      ))}
    </Card>
  );
};
