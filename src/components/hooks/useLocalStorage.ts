import {
  useEffect,
  useState,
} from 'react';

export const useLocalStorage = <T>(key: string, initialValue?: T) => {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
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
