import {
  useMemo,
  useCallback,
} from 'react';
import {
  atomFamily,
  selectorFamily,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import {
  authState,
} from './auth';

const methods = ['GET', 'POST', 'PUT', 'DELETE'] as const;
type FetchMethod = typeof methods[number];

export type FetchTarget = Readonly<{
  url: string;
  method: FetchMethod;
}>;

export const isFetchTarget = (input: unknown): input is FetchTarget => (
  typeof input === 'object'
  && input !== null
  && 'url' in input
  && typeof (input as FetchTarget).url === 'string'
  && 'method' in input
  && methods.includes((input as FetchTarget).method)
);

export type FetchParam = string | Readonly<FetchTarget>;

export interface FetchState<T = unknown> {
  // The response from the server.
  response: T;
  loading: boolean;
  error: any;
  statusCode: number;
}

export const unpackFetchParam = (
  params: FetchParam,
): FetchTarget => {
  if (!isFetchTarget(params)) {
    return { url: params, method: 'GET' };
  }
  return params;
};

export const fetchResponse = atomFamily<unknown, FetchTarget>({
  key: 'fetchResponse',
  default: null,
});
export const fetchLoading = atomFamily<boolean, FetchTarget>({
  key: 'fetchLoading',
  default: false,
});
export const fetchError = atomFamily<any, FetchTarget>({
  key: 'fetchError',
  default: null,
});
export const fetchStatusCode = atomFamily<number, FetchTarget>({
  key: 'fetchStatusCode',
  default: 0,
});

export const fetchState = selectorFamily<FetchState, FetchTarget>({
  key: 'fetchState',
  get: (params) => ({ get }) => ({
    response: get(fetchResponse(params)),
    loading: get(fetchLoading(params)),
    error: get(fetchError(params)),
    statusCode: get(fetchStatusCode(params)),
  }),
});

export const useFetchTarget = (
  params: FetchParam,
): FetchTarget => useMemo(() => unpackFetchParam(params), [params]);

export class FetchError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number,
  ) {
    super(message);
  }
}

export const useFetch = (
  target: FetchTarget,
) => {
  const { url, method } = target;
  const setResponse = useSetRecoilState(fetchResponse(target));
  const setLoading = useSetRecoilState(fetchLoading(target));
  const setError = useSetRecoilState(fetchError(target));
  const setStatusCode = useSetRecoilState(fetchStatusCode(target));
  const hasAuth = useRecoilValue(authState);
  const fetchUrl = useCallback(
    async (data?: any) => {
      setResponse(null);
      setLoading(false);
      setError(null);
      setStatusCode(0);
      try {
        const request = fetch(url, {
          method,
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            ...(hasAuth ? { Authorization: 'Yes' } : {}),
          },
        });
        setLoading(true);
        const response = await request;
        if (response.status !== 200) {
          throw new FetchError(await response.text(), response.status);
        }
        const json = await response.json();
        setResponse(json);
      } catch (e: unknown) {
        if (e instanceof FetchError) {
          setError(e.message);
          setStatusCode(e.statusCode);
        } else {
          setError(e);
        }
      } finally {
        setLoading(false);
      }
    },
    [url, method, setResponse, setLoading, setError, setStatusCode],
  );
  return fetchUrl;
};
