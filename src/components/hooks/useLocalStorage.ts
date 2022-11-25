import {
  useEffect,
  useState,
} from 'react';

export const useLocalStorage = <T>(
  key: string,
  initialValue?: T,
  validate?: (input: unknown) => input is T,
) => {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      const parsedValue = JSON.parse(storedValue);
      if ((validate && validate(parsedValue)) || !validate) {
        return parsedValue;
      }
    }
    return initialValue;
  });

  useEffect(
    () => {
      if (value === undefined) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    },
    [value],
  );

  return [value, setValue] as const;
};
