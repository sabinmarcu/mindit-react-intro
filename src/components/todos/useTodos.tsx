import {
  createContext,
  FC,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithChildren,
  PropsWithoutRef,
  RefAttributes,
  useCallback,
  useContext,
  useMemo,
} from 'react';

import list from '../../data/todos.json';
import {
  useLocalStorage,
} from '../../hooks/useLocalStorage';

export type Todo = typeof list[number];

export const isTodo = (value: unknown): value is Todo => (
  typeof value === 'object'
  && Object.prototype.hasOwnProperty.call(value, 'id')
  && Object.prototype.hasOwnProperty.call(value, 'text')
  && Object.prototype.hasOwnProperty.call(value, 'done')
  && typeof (value as Todo).id === 'string'
  && typeof (value as Todo).text === 'string'
  && typeof (value as Todo).done === 'boolean'
);

export const isTodoList = (value: unknown): value is Todo[] => (
  Array.isArray(value)
  && value.every(isTodo)
);

interface TodosType {
  todos: Todo[],
  onToggle: (id: Todo['id']) => void,
  deleteItem: (id: Todo['id']) => void,
  addItem: (text: Todo['text']) => void,
}

export const TodosContext = createContext<TodosType>({
  todos: [],
  onToggle: () => { throw new Error('Not implemented'); },
  deleteItem: () => { throw new Error('Not implemented'); },
  addItem: () => { throw new Error('Not implemented'); },
});

export const useTodos = () => {
  const [items, setItems] = useLocalStorage('todos', list);
  const onToggle = useCallback(
    (id: Todo['id']) => {
      setItems((prevItems) => prevItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            done: !item.done,
          };
        }
        return item;
      }));
    },
    [setItems],
  );
  const deleteItem = useCallback(
    (id: Todo['id']) => {
      setItems((prevItems) => prevItems.filter(
        (item) => item.id !== id,
      ));
    },
    [setItems],
  );
  const addItem = useCallback(
    (text: Todo['text']) => {
      const id = Math.max(...items.map((item) => item.id)) + 1;
      setItems((prevItems) => [...prevItems, { text, id, done: false }]);
    },
    [setItems],
  );

  const result: TodosType = {
    todos: items,
    onToggle,
    deleteItem,
    addItem,
  } as const;

  return result;
};

export const TodosProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const data = useTodos();
  return (
    <TodosContext.Provider value={data}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodosListIds = () => {
  const { todos } = useContext(TodosContext);
  const ids = useMemo(
    () => todos.map((item) => item.id),
    [todos],
  );
  return ids;
};

export const useTodo = (id: Todo['id']) => {
  const { todos } = useContext(TodosContext);
  const todo = useMemo(
    () => todos.find((item) => item.id === id)!,
    [todos, id],
  );
  return todo;
};

export const useTodoToggle = (id: Todo['id']) => {
  const { onToggle } = useContext(TodosContext);
  const toggle = useCallback(
    () => onToggle(id),
    [onToggle, id],
  );
  return toggle;
};

export const useTodoDelete = (id: Todo['id']) => {
  const { deleteItem } = useContext(TodosContext);
  const toggle = useCallback(
    () => deleteItem(id),
    [deleteItem, id],
  );
  return toggle;
};

export const useTodoAdd = () => (
  useContext(TodosContext).addItem
);

type WrapperProps<P> =
  Omit<P, keyof Todo>
  & { todo: Todo['id'] };

export const withTodo = <R extends HTMLElement, P extends Todo>(
  Component: ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<R>>,
) => {
  const Wrapper = forwardRef<R, WrapperProps<P>>(
    (props, ref) => {
      const { todo: id, ...rest } = props;
      const todo = useTodo(id);
      const finalProps = { ...rest, ...todo } as unknown as PropsWithoutRef<P>;
      return (
        <Component
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...finalProps}
          ref={ref}
        />
      );
    },
  );
  Wrapper.displayName = `withTodo(${Component.displayName ?? Component.name})`;
  return Wrapper;
};
