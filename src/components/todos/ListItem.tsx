import {
  forwardRef,
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

export const ListItem = forwardRef<HTMLDivElement, ListItemProps>(
  ({
    todo: id,
  }, ref) => {
    const {
      text,
      done,
    } = useTodo(id);
    const onToggle = useTodoToggle(id);
    return (
      <div className={styles.Item} ref={ref}>
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
  },
);

export const ListItemWithHoc = forwardRef<HTMLDivElement, Todo>(({
  text,
  done,
  id,
}, ref) => {
  const onToggle = useTodoToggle(id);
  return (
    <div className={styles.Item} ref={ref}>
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
});

// @ts-ignore
export const ListItemAfterHoc = withTodo(ListItemWithHoc);
