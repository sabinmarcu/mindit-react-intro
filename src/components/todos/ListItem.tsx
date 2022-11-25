import {
  FC,
} from 'react';
import {
  Todo,
  useTodo,
  useTodoToggle,
  withTodo,
} from './useTodos';
import styles from './ListItem.module.css';
import {
  DeleteItem,
} from './DeleteItem';

interface ListItemProps {
  todo: Todo['id'],
}

export const ListItem: FC<ListItemProps> = ({
  todo: id,
}) => {
  const {
    text,
    done,
  } = useTodo(id);
  const onToggle = useTodoToggle(id);
  return (
    <div className={styles.Item}>
      <p>{text}</p>
      <aside>
        <input
          type="checkbox"
          checked={done}
          onChange={onToggle}
        />
        <DeleteItem id={id} />
      </aside>
    </div>
  );
};

export const ListItemWithHoc: FC<Todo> = ({
  text,
  done,
  id,
}) => {
  const onToggle = useTodoToggle(id);
  return (
    <div className={styles.Item}>
      <p>{text}</p>
      <aside>
        <input
          type="checkbox"
          checked={done}
          onChange={onToggle}
        />
        <DeleteItem id={id} />
      </aside>
    </div>
  );
};

export const ListItemAfterHoc = withTodo(ListItemWithHoc);
