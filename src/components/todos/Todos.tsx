import {
  FC,
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

export const Todos: FC = () => (
  <TodosProvider>
    <AddItem />
    <List />
  </TodosProvider>
);
