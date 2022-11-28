/* eslint-disable react/jsx-props-no-spreading */
import styled from '@emotion/styled';
import {
  Card,
} from '@mui/material';
import {
  FC,
  forwardRef,
  useContext,
  useMemo,
} from 'react';
import {
  useParams,
} from 'react-router-dom';
import {
  Fetch,
  withResponse,
} from '../style/fetch';
import {
  EditContext,
  EditForm,
  EditProvider,
} from './editForm';
import {
  Loading,
  MovieDisplay,
} from './item';

export const Wrapper = styled.article`
  display: flex;
  flex-flow: row nowrap;
  gap: 2rem;
  padding-top: 2rem;
  align-items: flex-start;
  > * {
    flex: 1;
  }
`;

export const EditPreview = withResponse(
  forwardRef(() => {
    const { data: movie } = useContext(EditContext);
    if (!movie) {
      return null;
    }
    return <MovieDisplay {...movie} edit={false} />;
  }),
);

export const EditMovie: FC = () => {
  const { id } = useParams<{ id: string }>();
  const url = useMemo(
    () => `/movies/${id}`,
    [id],
  );
  return (
    <Fetch target={url} fetchOnMount>
      <EditProvider>
        <Wrapper>
          <Card>
            <Loading />
            <EditForm url={url} />
          </Card>
          <Card>
            <Loading />
            <EditPreview />
          </Card>
        </Wrapper>
      </EditProvider>
    </Fetch>
  );
};
