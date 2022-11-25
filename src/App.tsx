import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {
  Todos,
} from './components/todos/Todos';
import styles from './App.module.css';

function App() {
  return (
    <section className={styles.App}>
      <AppBar position="sticky">
        <Toolbar>
          <Container>
            <Typography variant="h4">Todo List App</Typography>
          </Container>
        </Toolbar>
      </AppBar>
      <Container className={styles.Content}>
        <Todos />
      </Container>
    </section>
  );
}

export default App;
