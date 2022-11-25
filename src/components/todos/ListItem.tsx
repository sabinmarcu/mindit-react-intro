import {
  forwardRef,
} from 'react';
import {
  Checkbox,
} from '@mui/material';
import {
  Todo,
  useTodo,
  useTodoToggle,
  withTodo,
} from './useTodos';
import {
  DeleteItem,
} from './DeleteItem';
import {
  Buttons,
  Text,
  Wrapper,
} from './ListItem.style';

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
      <Wrapper ref={ref}>
        <Text>{text}</Text>
        <Buttons>
          <input
            type="checkbox"
            checked={done}
            onChange={onToggle}
          />
          <DeleteItem id={id} />
        </Buttons>
      </Wrapper>
    );
  },
);

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
    <Wrapper
      className={className}
      ref={ref}
    >
      <Text variant="h4">{text}</Text>
      <Buttons>
        <Checkbox
          checked={done}
          onChange={onToggle}
        />
        <DeleteItem id={id} />
      </Buttons>
    </Wrapper>
  );
});

export const ListItemAfterHoc = withTodo(ListItemWithHoc);
