import styled from '@emotion/styled';
import MUIButton from '@mui/material/Button';

export const Button = styled(MUIButton)`
  border-radius: 4px;
  color: black;
  cursor: pointer;
  &&[disabled] {
    pointer-events: auto;
    cursor: not-allowed;
  }
`;
