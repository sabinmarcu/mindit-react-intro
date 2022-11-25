import {
  forwardRef,
} from 'react';
import {
  Checkbox,
} from '@mui/material';
import styled from '@emotion/styled';
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

const StyledP = styled.p`
  color: inherit;
`;

export const ListItemWithHoc = forwardRef<
  HTMLDivElement,
  // eslint-disable-next-line react/require-default-props
  Todo & { className?: string }
>(({
  text,
  done,
  id,
  className,
}, ref) => {
  const onToggle = useTodoToggle(id);
  return (
    <div
      className={[styles.Item, className].filter(Boolean).join(' ')}
      ref={ref}
    >
      <StyledP>{text}</StyledP>
      <aside>
        <Checkbox
          checked={done}
          onChange={onToggle}
        />
        <DeleteItem id={id} />
      </aside>
    </div>
  );
});

export const ListItemAfterHoc = true
// styled(
  && withTodo(ListItemWithHoc);
// )`
//   background: blue;
//   ${StyledP} {
//     color: green;
//   }
// `;
