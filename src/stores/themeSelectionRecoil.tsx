import {
  FC,
  PropsWithChildren,
} from 'react';
import {
  atom,
  selector,
  AtomEffect,
  useRecoilValue,
} from 'recoil';
import {
  ThemeProvider as MUIThemeProvider,
} from '@mui/material';
import {
  themes,
  ThemeSelection,
} from '../data/themes';

const localStorageEffect = <T extends unknown>(key: string): AtomEffect<T> => ({
  setSelf,
  onSet,
}) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet((newValue, _, isReset) => (
    isReset
      ? localStorage.removeItem(key)
      : localStorage.setItem(key, JSON.stringify(newValue))
  ));
};

const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
export const darkMode = atom({
  key: 'darkMode',
  default: matchMedia.matches,
  effects: [
    ({ setSelf }) => {
      const handler = (e: MediaQueryListEvent) => {
        setSelf(e.matches);
      };
      matchMedia.addEventListener('change', handler);
      return () => matchMedia.removeEventListener('change', handler);
    },
  ],
});

export const themeSelection = atom<ThemeSelection>({
  key: 'themeSelection',
  default: 'system',
  effects: [
    localStorageEffect('themeRecoil'),
  ],
});

export const theme = selector({
  key: 'theme',
  get: ({ get }) => {
    const selection = get(themeSelection);
    if (selection === 'system') {
      return get(darkMode) ? 'dark' : 'light';
    }
    return selection;
  },
});

export const muiTheme = selector({
  key: 'muiTheme',
  get: ({ get }) => themes[get(theme)],
});

export const ThemeProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const value = useRecoilValue(muiTheme);
  return (
    <MUIThemeProvider theme={{ ...value }}>
      {children}
    </MUIThemeProvider>
  );
};
