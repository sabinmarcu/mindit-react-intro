import {
  FC,
} from 'react';
import {
  Card,
} from '../layout/Card';
import {
  ListItemAfterHoc,
} from './ListItem';
import {
  useTodosListIds,
} from './useTodos';

export const List: FC = () => {
  const ids = useTodosListIds();
  return (
    <Card>
      {ids.map((id) => (
        <ListItemAfterHoc
          key={id}
          todo={id}
        />
      ))}
    </Card>
  );
};
