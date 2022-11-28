/* eslint-disable react/jsx-props-no-spreading */
import {
  FC,
  PropsWithChildren,
} from 'react';
import {
  Navigate,
} from 'react-router-dom';
import {
  atom,
  useRecoilValue,
} from 'recoil';
import {
  localStorageEffect,
} from './themeSelectionRecoil';

export const authState = atom<boolean>({
  key: 'auth',
  default: false,
  effects: [
    localStorageEffect('authState'),
  ],
});

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const hasAuth = useRecoilValue(authState);
  if (!hasAuth) {
    return (
      <Navigate to="/" />
    );
  }
  return (
    <>
      {children}
    </>
  );
};
