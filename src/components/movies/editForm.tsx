/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import styled from '@emotion/styled';
import {
  Button,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from '@mui/material';
import {
  ChangeEvent,
  createContext,
  FC,
  forwardRef,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ComponentPropsWithoutRef,
} from 'react';
import {
  useNavigate,
} from 'react-router-dom';
import {
  Movie,
} from '../../data/msw';
import {
  Validator,
} from '../../hooks/useInput';
import {
  Fetch,
  FetchContext,
  useFetchResponse,
  withResponse,
} from '../style/fetch';

const defaultMovie = {
  title: '',
  year: 0,
  genre: '',
  poster: '',
  plot: '',
  id: '',
} satisfies Movie;

type EditMovieTrait = Record<EditFieldType, boolean>;

const defaultMovieTrait = {
  title: false,
  year: false,
  genre: false,
  poster: false,
  plot: false,
} satisfies EditMovieTrait;

export type EditContextType = {
  data: Movie;
  touched: EditMovieTrait,
  valid: EditMovieTrait,
  shouldReset: boolean,
  shouldSubmit: boolean,
  updateField: <Field extends EditFieldType>(
    field: Field,
    value: Movie[Field]
  ) => void;
  updateValid: <Field extends EditFieldType>(
    field: Field,
    value: boolean
  ) => void;
  reset: () => void;
};
export const EditContext = createContext<EditContextType>({
  data: { ...defaultMovie },
  touched: { ...defaultMovieTrait },
  valid: { ...defaultMovieTrait },
  shouldReset: false,
  shouldSubmit: false,
  updateField: () => { throw new Error('Not implemented'); },
  updateValid: () => { throw new Error('Not implemented'); },
  reset: () => { throw new Error('Not implemented'); },
});

type EditFieldType = Exclude<keyof Movie, 'id'>;
export const EditProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const movie = useFetchResponse<Movie>();
  const [context, setContext] = useState<Movie>();
  const [valid, setValid] = useState<EditMovieTrait>({ ...defaultMovieTrait });
  const [touched, setTouched] = useState<EditMovieTrait>({ ...defaultMovieTrait });
  useEffect(
    () => {
      if (!context && movie) {
        setContext(movie);
      }
    },
    [context, movie],
  );
  const updateField = useCallback<EditContextType['updateField']>(
    (field, value) => {
      setContext(
        (prev) => {
          if (!prev) {
            return prev;
          }
          return {
            ...prev,
            [field]: value,
          };
        },
      );
    },
    [setContext],
  );
  const updateValid = useCallback<EditContextType['updateValid']>(
    (field, value) => {
      setValid(
        (prev) => {
          if (!prev) {
            return prev;
          }
          return {
            ...prev,
            [field]: value,
          };
        },
      );
    },
    [setContext],
  );
  useEffect(
    () => {
      if (!context || !movie) {
        return;
      }
      const newTouched = { ...touched };
      Object.keys(context)
        .filter((key) => key !== 'id')
        .forEach((field) => {
          const f = field as EditFieldType;
          if (context[f] !== movie[f]) {
            newTouched[f] = true;
          }
        });
      setTouched(newTouched);
    },
    [context, movie, touched],
  );
  const shouldReset = useMemo(
    () => Object.values(touched)
      .reduce((prev, curr) => prev || curr, false),
    [touched],
  );
  const shouldSubmit = useMemo(
    () => Object.values(valid)
      .reduce((prev, curr) => prev && curr, true),
    [valid],
  );

  const reset = useCallback(
    () => {
      setContext(movie);
      setValid({ ...defaultMovieTrait });
      setTouched({ ...defaultMovieTrait });
    },
    [movie, setContext],
  );
  const ctx = {
    data: context || defaultMovie,
    updateField,
    updateValid,
    reset,
    touched,
    valid,
    shouldReset,
    shouldSubmit,
  } satisfies EditContextType;
  return (
    <EditContext.Provider value={ctx}>
      {children}
    </EditContext.Provider>
  );
};

export const useFieldValue = <Field extends EditFieldType>(
  field: Field,
): Movie[Field] => {
  const movie = useContext(EditContext);
  const value = useMemo(
    () => movie.data[field],
    [movie.data, field],
  );
  return value;
};

export const useEditField = (field: EditFieldType) => {
  const value = useFieldValue(field);
  const { updateField } = useContext(EditContext);
  return [value, updateField] as const;
};

export const useFieldValid = <Field extends EditFieldType>(
  field: Field,
): boolean => {
  const movie = useContext(EditContext);
  const value = useMemo(
    () => movie.valid[field],
    [movie.valid, field],
  );
  return value;
};
export const useFieldTouched = <Field extends EditFieldType>(
  field: Field,
): boolean => {
  const movie = useContext(EditContext);
  const value = useMemo(
    () => movie.touched[field],
    [movie.touched, field],
  );
  return value;
};

export const useEditValid = (field: EditFieldType) => {
  const value = useFieldValid(field);
  const { updateValid } = useContext(EditContext);
  return [value, updateValid] as const;
};

const StyledTextField = styled(TextField)`
  margin: 1rem 0;
`;

export const EditField: FC<
  {
    field: EditFieldType,
    validate?: Validator | Validator[],
  }
  & ComponentPropsWithoutRef<typeof StyledTextField>
> = ({
  field,
  validate,
  ...props
}) => {
  const touched = useFieldTouched(field);
  const [value, updateField] = useEditField(field);
  const [valid, updateValid] = useEditValid(field);
  const validateSet = useMemo(
    () => {
      if (!validate) {
        return undefined;
      }
      if (Array.isArray(validate)) {
        return validate;
      }
      return [validate];
    },
    [validate],
  );
  const errors = useMemo(
    (): [] | string[] => {
      if (!validateSet) {
        return [];
      }
      const errs = validateSet
        .map((validator) => validator(`${value}`))
        .filter(Boolean) as string[];
      return errs;
    },
    [validateSet, value],
  );
  useEffect(
    () => {
      updateValid(field, errors.length === 0);
    },
    [errors, field, updateValid],
  );
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      updateField(field, e.target.value);
    },
    [field, updateField],
  );
  const label = useMemo(
    () => field.charAt(0).toUpperCase() + field.slice(1),
    [field],
  );
  return (
    <StyledTextField
      fullWidth
      variant="standard"
      {...props}
      label={label}
      value={value}
      onChange={onChange}
      error={touched && !valid}
      helperText={errors.join('\n')}
    />
  );
};

const isYear = ((value: string) => (
  !/^[0-9]{4}$/.test(value) ? 'Year must be 4 digits' : undefined
)) satisfies Validator;

const SubmitButton: FC = () => {
  const navigate = useNavigate();
  const { shouldReset, shouldSubmit } = useContext(EditContext);
  const { send } = useContext(FetchContext);
  const onClick = useCallback(
    async () => {
      await send();
      navigate('/');
    },
    [send, navigate],
  );

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={!shouldReset || !shouldSubmit}
    >
      Submit
    </Button>
  );
};

export const EditForm = withResponse(
  forwardRef(({ url }: { url: string }) => {
    const title = useFieldValue('title');
    const { reset, shouldReset, data } = useContext(EditContext);
    return (
      <>
        <CardHeader title={title} />
        <CardContent>
          <EditField field="title" />
          <EditField field="genre" />
          <EditField field="year" validate={isYear} />
          <EditField field="plot" />
          <EditField field="poster" />
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            onClick={reset}
            disabled={!shouldReset}
          >
            Reset
          </Button>
          <Fetch target={{ url, method: 'POST' }} body={data}>
            <SubmitButton />
          </Fetch>
        </CardActions>
      </>
    );
  }),
);
