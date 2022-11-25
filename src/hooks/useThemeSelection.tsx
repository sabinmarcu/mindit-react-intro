import {
  ThemeProvider,
} from '@mui/material';
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';
import {
  ThemeSelection,
} from '../data/themes';
import {
  useLocalStorage,
} from './useLocalStorage';
import {
  useMediaQuery,
} from './useMediaQuery';
import {
  useTheme,
} from './useTheme';

export type ThemeSelectionContextType = ReturnType<typeof useThemeSelectionLogic>;
export const ThemeSelectionContext = createContext<ThemeSelectionContextType>([
  'dark',
  'system',
  () => { throw new Error('Not implemented'); },
]);

export const useThemeSelectionLogic = () => {
  const [selection, setSelection] = useLocalStorage<ThemeSelection>('theme', 'system');
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () => {
      if (selection === 'system') {
        return prefersDark ? 'dark' : 'light';
      }
      return selection;
    },
    [selection, prefersDark],
  );
  return [theme, selection, setSelection] as const;
};

export const ThemeSelectionProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const themeSelection = useThemeSelectionLogic();
  const theme = useTheme(themeSelection[0]);
  return (
    <ThemeSelectionContext.Provider value={themeSelection}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeSelectionContext.Provider>
  );
};

export const useThemeSelection = () => useContext(ThemeSelectionContext);
