import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type Validator = (value: string) => string | undefined;

export const useInput = (
  initialValue: string = '',
  validators: Validator[] = [],
) => {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    [setValue],
  );

  const errors = useMemo(
    () => validators.map((validator) => validator(value)),
    [value, validators],
  );

  const isValid = useMemo(
    () => errors.filter(Boolean).length === 0,
    [errors],
  );

  const [isTouched, setIsTouched] = useState(false);
  useEffect(
    () => {
      if (value) {
        setIsTouched(true);
      }
    },
    [value, setIsTouched],
  );

  const reset = useCallback(
    () => {
      setValue(initialValue);
      setIsTouched(false);
    },
    [setValue, setIsTouched, initialValue],
  );

  return {
    value, onChange, errors, isValid, isTouched, reset,
  };
};
