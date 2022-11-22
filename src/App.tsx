import {
  Container,
} from './components/layout/Container';
import {
  Todos,
} from './components/todos/Todos';
import styles from './App.module.css';

function App() {
  return (
    <section className={styles.App}>
      <header className={styles.NavBar}>
        <Container>Todo List App</Container>
      </header>
      <Container className={styles.Content}>
        <Todos />
      </Container>
    </section>
  );
}

export default App;
