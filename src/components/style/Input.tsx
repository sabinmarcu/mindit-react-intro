import styled from '@emotion/styled';

interface InputProps {
  valid?: boolean,
  touched?: boolean;
}

export const Input = styled.input<InputProps>(
  `
    flex: 1;
    background: transparent;
    border-radius: 0;
    border: none;
    border-bottom: solid 2px white;
    color: white;
    outline: none;
    font-size: 1.2rem;
    padding: 0.5rem 0;
  `,
  ({ valid, touched }) => {
    if (!touched) {
      return 'border-color: white;';
    }
    if (valid) {
      return 'border-color: green;';
    }
    return 'border-color: red;';
  },
);
