import {
  FC,
  PropsWithChildren,
} from 'react';
import styles from './Container.module.css';

export const Container: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => (
  <div className={[
    styles.Container,
    className,
  ].filter(Boolean).join(' ')}
  >
    {children}
  </div>
);

Container.defaultProps = {
  className: undefined,
};
