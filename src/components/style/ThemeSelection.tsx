import {
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  FC,
  useCallback,
  useRef,
  useState,
} from 'react';
import {
  DarkMode,
  LightMode,
  SettingsSuggest,
} from '@mui/icons-material';
import styled from '@emotion/styled';
import {
  useThemeSelection,
} from '../../hooks/useThemeSelection';
import {
  ThemeSelection as ThemeSelectionType,
  themeSelectionText,
} from '../../data/themes';

export const ThemeSelectionIcon: FC = () => {
  const [,selection] = useThemeSelection();
  switch (selection) {
  case 'light': return <LightMode />;
  case 'dark': return <DarkMode />;
  default: return <SettingsSuggest />;
  }
};

const ThemeSelectionButton = styled(IconButton)(
  ({ theme: { palette: { primary: { contrastText: color } } } }) => ({
    color,
  }),
);

const ThemeSelectionItem = styled(MenuItem)<{ active: boolean }>(
  ({ active, theme: { palette: { primary: { main } } } }) => ({
    color: active ? main : undefined,
  }),
);

export const ThemeSelection: FC = () => {
  const [,selection, setSelection] = useThemeSelection();
  const [open, setOpen] = useState(false);
  const toggleOpen = useCallback(() => setOpen((prev) => !prev), []);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const onSelect = useCallback(
    (value: ThemeSelectionType) => () => {
      setSelection(value);
      setOpen(false);
    },
    [setSelection, setOpen],
  );
  return (
    <>
      <ThemeSelectionButton onClick={toggleOpen} ref={buttonRef}>
        <ThemeSelectionIcon />
      </ThemeSelectionButton>
      <Menu open={open} onClick={toggleOpen} anchorEl={buttonRef.current}>
        {Object.entries(themeSelectionText).map<ThemeSelectionType, string>(
          ([key, text]) => (
            <ThemeSelectionItem
              key={key}
              value={key}
              active={key === selection}
              onClick={onSelect(key)}
            >
              {text}
            </ThemeSelectionItem>
          ),
        )}
      </Menu>
    </>
  );
};
// const [selection, setSelection] = useThemeSelection();
