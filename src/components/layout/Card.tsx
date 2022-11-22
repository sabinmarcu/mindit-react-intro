import {
  FC,
  PropsWithChildren,
} from 'react';
import styles from './Card.module.css';

export const Card: FC<PropsWithChildren> = ({ children }) => (
  <div className={styles.Card}>
    {children}
  </div>
);
