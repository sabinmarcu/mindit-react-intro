import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import {
  Todos,
} from './components/todos/Todos';
import styles from './App.module.css';
import {
  ThemeSelectionProvider,
} from './hooks/useThemeSelection';
import {
  ThemeSelection,
} from './components/style/ThemeSelection';

export const AppWrapper = styled.section(`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  overflow-x: hidden;
  overflow-y: auto;
`, ({
  theme: {
    palette: {
      text: { primary: textColor },
      background: { default: bgColor },
    },
  },
}) => ({
  color: textColor,
  backgroundColor: bgColor,
}));

export const ToolbarContainer = styled(Container)`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
`;

function App() {
  return (
    <ThemeSelectionProvider>
      <AppWrapper>
        <AppBar position="sticky">
          <Toolbar>
            <ToolbarContainer>
              <Typography variant="h4">Todo List App</Typography>
              <ThemeSelection />
            </ToolbarContainer>
          </Toolbar>
        </AppBar>
        <Container className={styles.Content}>
          <Todos />
        </Container>
      </AppWrapper>
    </ThemeSelectionProvider>
  );
}

export default App;
