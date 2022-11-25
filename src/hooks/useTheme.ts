import {
  useMemo,
} from 'react';
import {
  themes,
  ThemeType,
} from '../data/themes';

export const useTheme = (selection: ThemeType) => {
  const theme = useMemo(
    () => themes[selection],
    [selection],
  );
  return theme;
};
