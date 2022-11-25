import styled from '@emotion/styled';

export const Button = styled.button`
  border: none;
  padding: 1.2rem;
  border-radius: 4px;
  background-color: #fff;
  color: black;
  font-size: 1.2rem;
  cursor: pointer;
  &[disabled] {
    background-color: #aaa;
    cursor: not-allowed;
  }
  &:hover:not([disabled]) {
    background-color: #ccc;
  }
`;
