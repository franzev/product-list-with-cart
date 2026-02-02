import clsx from "clsx";
import styles from "./Button.module.css";
import type { HTMLAttributes } from "react";

export const Button = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button type="button" className={clsx(styles.base, className)} {...props}>
      {children}
    </button>
  );
};
