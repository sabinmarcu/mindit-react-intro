import {
  useEffect,
  useMemo,
  useState,
} from 'react';

export const useMediaQuery = (query: string) => {
  const match = useMemo(
    () => window.matchMedia(query),
    [query],
  );
  const [hasMatch, setHasMatch] = useState(match.matches);
  useEffect(
    () => {
      if (!match) {
        return undefined;
      }
      const handler = (e: MediaQueryListEvent) => {
        setHasMatch(e.matches);
      };
      match.addEventListener('change', handler);
      return () => match.removeEventListener('change', handler);
    },
    [match, setHasMatch],
  );
  return hasMatch;
};
