import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import list from '../../data/todos.json';

export type Todo = typeof list[number];

interface TodosType {
  todos: Todo[],
  onToggle: (id: Todo['id']) => void,
  deleteItem: (id: Todo['id']) => void,
}

export const TodosContext = createContext<TodosType>({
  todos: [],
  onToggle: () => { throw new Error('Not implemented'); },
  deleteItem: () => { throw new Error('Not implemented'); },
});

export const useTodos = () => {
  const [items, setItems] = useState(list);
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

  const result: TodosType = {
    todos: items,
    onToggle,
    deleteItem,
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
