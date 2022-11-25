import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import {
  RecoilRoot,
} from 'recoil';
import {
  Todos,
} from './components/todos/Todos';
import styles from './App.module.css';
import {
  ThemeSelection,
} from './components/style/ThemeSelection';
import {
  ThemeProvider,
} from './stores/themeSelectionRecoil';

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
    <RecoilRoot>
      <ThemeProvider>
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
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
