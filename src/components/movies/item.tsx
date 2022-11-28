/* eslint-disable react/jsx-props-no-spreading */
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  IconButton,
} from '@mui/material';
import {
  FC,
  forwardRef,
  useMemo,
} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import {
  Link,
} from 'react-router-dom';
import {
  r,
} from 'msw/lib/SetupApi-b2f0e5ac';
import {
  Fetch,
  useFetchResponse,
  withLoading,
  withResponse,
} from '../style/fetch';
import {
  Movie,
} from '../../data/msw';

export const Loading = withLoading(
  forwardRef(
    () => (
      <CardContent style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 300,
        minHeight: 300,
      }}
      >
        <CircularProgress />
      </CardContent>
    ),
  ),
);

// eslint-disable-next-line react/require-default-props
export const MovieDisplay: FC<Movie & { edit?: boolean }> = ({
  title,
  year,
  genre,
  poster,
  plot,
  id,
  edit = true,
}) => (
  <>
    <CardHeader
      title={title}
      subheader={`${genre} - ${year}`}
      action={edit
        ? (
          <Link to={`/${id}`}>
            <IconButton aria-label="settings">
              <EditIcon />
            </IconButton>
          </Link>
        )
        : undefined}
    />
    <CardMedia
      component="img"
      height="200"
      image={poster}
      alt={title}
    />
    <CardContent>{plot}</CardContent>
  </>
);

export const Response = withResponse(
  forwardRef(
    () => {
      const movie = useFetchResponse<Movie>() ?? {};
      return (<MovieDisplay {...movie} />);
    },
  ),
);

export const Item: FC<{ id: string }> = ({ id }) => {
  const url = useMemo(
    () => `/movies/${id}`,
    [id],
  );
  return (
    <Fetch target={url} fetchOnMount>
      <Card>
        <Loading />
        <Response />
      </Card>
    </Fetch>
  );
};
