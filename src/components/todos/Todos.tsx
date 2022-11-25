import {
  FC,
  useEffect,
  useRef,
} from 'react';
import {
  AddItem,
} from './AddItem';
import {
  List,
} from './List';
import {
  TodosProvider,
} from './useTodos';

export const Todos: FC = () => {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(
    () => {
      ref.current?.focus();
    },
    [ref],
  );
  return (
    <TodosProvider>
      <AddItem ref={ref} />
      <List />
    </TodosProvider>
  );
};
