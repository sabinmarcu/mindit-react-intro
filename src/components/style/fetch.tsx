import {
  createContext,
  FC,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithChildren,
  PropsWithoutRef,
  RefAttributes,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  useRecoilValue,
} from 'recoil';
import {
  fetchError,
  fetchLoading,
  FetchParam,
  fetchResponse,
  FetchTarget,
  useFetch,
  useFetchTarget,
} from '../../stores/fetch';

export type FetchContextType = {
  target: FetchTarget;
  fetch: () => void;
};

export const FetchContext = createContext<FetchContextType>({
  target: {
    url: '',
    method: 'GET',
  },
  fetch: () => { throw new Error('FetchContext not provided'); },
});

export const withLoading = <T extends unknown, P extends {}>(
  Component: ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>,
) => {
  const WithLoading = forwardRef<T, P>(
    (props, ref) => {
      const { target } = useContext(FetchContext);
      const isLoading = useRecoilValue(fetchLoading(target));
      if (!isLoading) return null;
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <Component {...props as PropsWithoutRef<P>} ref={ref} />;
    },
  );
  WithLoading.displayName = `withLoading(${Component.displayName || Component.name})`;
  return WithLoading;
};

export const withResponse = <T extends unknown, P extends {}>(
  Component: ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>,
) => {
  const WithResponse = forwardRef<T, P>(
    (props, ref) => {
      const { target } = useContext(FetchContext);
      const isLoading = useRecoilValue(fetchLoading(target));
      const hasResponse = useRecoilValue(fetchResponse(target));
      if (isLoading || !hasResponse) return null;
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <Component {...props as PropsWithoutRef<P>} ref={ref} />;
    },
  );
  WithResponse.displayName = `withResponse(${Component.displayName || Component.name})`;
  return WithResponse;
};

export const withError = <T extends unknown, P extends {}>(
  Component: ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>,
) => {
  const WithError = forwardRef<T, P>(
    (props, ref) => {
      const { target } = useContext(FetchContext);
      const isLoading = useRecoilValue(fetchLoading(target));
      const hasError = useRecoilValue(fetchError(target));
      if (isLoading || !hasError) return null;
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <Component {...props as PropsWithoutRef<P>} ref={ref} />;
    },
  );
  WithError.displayName = `withError(${Component.displayName || Component.name})`;
  return WithError;
};

export const withLoadingState = <T extends unknown, P extends { loading: boolean }>(
  Component: ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>,
) => {
  const WithLoadingState = forwardRef<T, Omit<P, 'loading'>>(
    (props, ref) => {
      const { target } = useContext(FetchContext);
      const isLoading = useRecoilValue(fetchLoading(target));
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <Component {...props as PropsWithoutRef<P>} loading={isLoading} ref={ref} />;
    },
  );
  WithLoadingState.displayName = `withLoadingState(${Component.displayName || Component.name})`;
  return WithLoadingState;
};

export interface FetchProps extends PropsWithChildren<{
  target: FetchParam;
  fetchOnMount?: boolean;
}> {}

export const Fetch: FC<FetchProps> = ({
  target: params,
  children,
  fetchOnMount,
}) => {
  const target = useFetchTarget(params);
  const fetch = useFetch(target);
  const [mounted, setMounted] = useState(false);
  useEffect(
    () => {
      if (fetchOnMount && !mounted) {
        setMounted(true);
        return fetch();
      }
      return undefined;
    },
    [fetch, mounted, setMounted, fetchOnMount],
  );
  const context = useMemo(
    () => ({
      target,
      fetch,
    }) satisfies FetchContextType,
    [target, fetch],
  );

  return (
    <FetchContext.Provider value={context}>
      {children}
    </FetchContext.Provider>
  );
};

export const useFetchResponse = <T = unknown>() => {
  const { target } = useContext(FetchContext);
  return useRecoilValue(fetchResponse(target)) as T;
};

export const useFetchError = () => {
  const { target } = useContext(FetchContext);
  return useRecoilValue(fetchError(target));
};
