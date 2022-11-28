import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import {
  RecoilRoot,
} from 'recoil';
import {
  Helmet,
} from 'react-helmet';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useLocation,
} from 'react-router-dom';
import styles from './App.module.css';
import {
  ThemeSelection,
} from './components/style/ThemeSelection';
import {
  ThemeProvider,
} from './stores/themeSelection';
import {
  Movies,
} from './components/movies/index';
import {
  EditMovie,
} from './components/movies/edit';

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
    <BrowserRouter>
      <Helmet>
        <title>Movies App</title>
      </Helmet>
      <RecoilRoot>
        <ThemeProvider>
          <AppWrapper>
            <AppBar position="sticky">
              <Toolbar>
                <ToolbarContainer>
                  <Typography variant="h4">
                    <Link to="/">Movies App</Link>
                  </Typography>
                  <ThemeSelection />
                </ToolbarContainer>
              </Toolbar>
            </AppBar>
            <Container className={styles.Content}>
              <Routes>
                <Route path="/" element={<Movies />} />
                <Route path="/:id" element={<EditMovie />} />
              </Routes>
            </Container>
          </AppWrapper>
        </ThemeProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
