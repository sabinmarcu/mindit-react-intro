import styled from '@emotion/styled';

export const Card = styled.div(`
  width: 100%;
  border-radius: 4px;
  padding: 1rem 0;
  margin-top: 2rem;
  border: solid 2px transparent;
  & > * {
    padding: 1rem 1.5rem;
  }
`, ({
  theme: {
    palette: { background: { paper: bgColor } },
  },
}) => ({
  background: bgColor,
  borderColor: bgColor,
}));
