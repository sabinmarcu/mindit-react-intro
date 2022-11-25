import styled from '@emotion/styled';
import {
  Typography,
} from '@mui/material';

export const Wrapper = styled.div(`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`, ({
  theme: {
    palette: { background: { default: bgColor } },
    transitions: { create },
  },
}) => `
  transition: ${create('background')};
  &:hover {
    background: ${bgColor};
  }
`);

export const Buttons = styled.aside`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Text = styled(Typography)`
  padding: 0;
  margin: 0;
`;
