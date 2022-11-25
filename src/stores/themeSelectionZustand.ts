import create from 'zustand/react';
import {
  ThemeSelection,
  ThemeType,
} from '../data/themes';

interface ThemeSelectionStore {
  selection: ThemeSelection;
  theme: ThemeType;
}

const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
const determineOSTheme = () => {
  if (matchMedia.matches) {
    return 'dark';
  }
  return 'light';
};

export const useThemeSelection = create<ThemeSelectionStore>(
  () => ({
    selection: 'system',
    theme: determineOSTheme(),
  }),
);

export const setSelection = (selection: ThemeSelection) => {
  useThemeSelection.setState({ selection });
  if (selection === 'system') {
    useThemeSelection.setState({ theme: determineOSTheme() });
  } else {
    useThemeSelection.setState({ theme: selection });
  }
};

matchMedia.addEventListener(
  'change',
  () => {
    if (useThemeSelection.getState().selection === 'system') {
      useThemeSelection.setState({ theme: determineOSTheme() });
    }
  },
);
