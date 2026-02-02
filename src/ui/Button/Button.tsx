import styles from './Button.module.css';
import type { HTMLAttributes } from 'react';

export const Button = ({ children, ...props }: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button type="button" className={styles.base} {...props}>
      {children}
    </button>
  );
};
