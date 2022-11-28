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
  useRecoilValue,
  useRecoilState,
} from 'recoil';
import {
  ThemeSelection as ThemeSelectionType,
  themeSelectionText,
} from '../../data/themes';
import {
  themeSelection,
} from '../../stores/themeSelectionRecoil';

export const ThemeSelectionIcon: FC = () => {
  const selection = useRecoilValue(themeSelection);
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

const ThemeSelectionItem = styled(
  MenuItem,
  { shouldForwardProp: (prop) => prop !== 'isSelected' },
)<{ isSelected: boolean }>(
  ({ isSelected, theme: { palette: { primary: { main } } } }) => ({
    color: isSelected ? main : undefined,
  }),
);

export const ThemeSelection: FC = () => {
  const [selection, setSelection] = useRecoilState(themeSelection);
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
        {Object.entries(themeSelectionText).map(
          ([key, text]) => (
            <ThemeSelectionItem
              key={key}
              value={key}
              isSelected={key === selection}
              onClick={onSelect(key as ThemeSelectionType)}
            >
              {text}
            </ThemeSelectionItem>
          ),
        )}
      </Menu>
    </>
  );
};
