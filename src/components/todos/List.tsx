import {
  FC,
} from 'react';
import styles from './List.module.css';
import {
  ListItem,
} from './ListItem';
import {
  useTodosListIds,
} from './useTodos';

export const List: FC = () => {
  const ids = useTodosListIds();
  return (
    <div className={styles.List}>
      {ids.map((id) => (
        <ListItem
          key={id}
          todo={id}
        />
      ))}
    </div>
  );
};
