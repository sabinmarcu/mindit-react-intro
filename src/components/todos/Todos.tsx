import {
  FC,
} from 'react';
import {
  List,
} from './List';
import {
  TodosProvider,
} from './useTodos';

export const Todos: FC = () => (
  <TodosProvider>
    <List />
    <TodosProvider>
      <List />
    </TodosProvider>
  </TodosProvider>
);
