import {
  atom,
} from 'jotai';
import {
  atomWithStorage,
} from 'jotai/utils';
import {
  themes,
  ThemeSelection,
} from '../data/themes';

const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
export const darkMode = atom(matchMedia.matches);
darkMode.onMount = (setAtom) => {
  setAtom(matchMedia.matches);
  const handler = (e: MediaQueryListEvent) => {
    setAtom(e.matches);
  };
  matchMedia.addEventListener('change', handler);
  return () => matchMedia.removeEventListener('change', handler);
};

export const themeSelection = atomWithStorage<ThemeSelection>('themeJotai', 'system');

export const theme = atom(
  (get) => {
    const selection = get(themeSelection);
    if (selection === 'system') {
      return get(darkMode) ? 'dark' : 'light';
    }
    return selection;
  },
);

export const muiTheme = atom(
  (get) => themes[get(theme)],
);
