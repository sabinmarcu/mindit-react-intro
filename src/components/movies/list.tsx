import styled from '@emotion/styled';
import {
  CircularProgress,
} from '@mui/material';
import {
  FC,
  forwardRef,
} from 'react';
import {
  Fetch,
  useFetchError,
  useFetchResponse,
  withError,
  withLoading,
  withLoadingState,
  withResponse,
} from '../style/fetch';
import {
  Item,
} from './item';

const StyledWrapper = styled('section', {
  shouldForwardProp: (prop) => !['loading'].includes(prop),
})<{ loading?: boolean }>(`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
`, ({ loading }) => (loading
  ? `
  align-items: center;
  justify-content: center;
  `
  : ''));
export const Wrapper = withLoadingState(
  forwardRef(
    // eslint-disable-next-line react/jsx-props-no-spreading
    (props) => <StyledWrapper {...props} />,
  ),
);

export const Loading = withLoading(
  forwardRef(
    // eslint-disable-next-line react/jsx-props-no-spreading
    (props, ref) => <CircularProgress {...props} ref={ref} />,
  ),
);

const StyledContainer = styled('div')`
  display: flex;
  flex-flow: row wrap;
  gap: 2rem;
  padding-top: 2rem;
  align-items: stretch;
  justify-content: stretch;
  > * {
    flex: 1 1 300px;
  }
`;

export const Response = withResponse(
  forwardRef(
    // eslint-disable-next-line react/jsx-props-no-spreading
    (props, ref) => {
      const ids = useFetchResponse<string[]>();
      return (
        <StyledContainer>
          {ids.map((id) => (
            <Item key={id} id={id} />
          ))}
        </StyledContainer>
      );
    },
  ),
);

export const Error = withError(
  forwardRef(
    // eslint-disable-next-line react/jsx-props-no-spreading
    (props, ref) => {
      console.log(useFetchError());
      return (<div>ERROR</div>);
    },
  ),
);

export const MoviesList: FC = () => (
  <Fetch target="/movies" fetchOnMount>
    <Wrapper>
      <Loading />
      <Response />
      <Error />
    </Wrapper>
  </Fetch>
);
