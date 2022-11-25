import {
  createTheme,
} from '@mui/material';

export type ThemeType = 'light' | 'dark';
export type ThemeSelection = ThemeType | 'system';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#fff',
      paper: '#ccc',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#444444',
    },
  },
});

export type Theme = typeof lightTheme;

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} satisfies Record<ThemeType, Theme>;

export const themeSelectionText = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
} satisfies Record<ThemeSelection, string>;
