import clsx from "clsx";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  titleId?: string;
  descriptionId?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  titleId,
  descriptionId,
}: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      setIsClosing(false);
      dialog.showModal();

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      if (dialog.open) {
        let timeoutId: NodeJS.Timeout | undefined;
        // Wait a frame to ensure current state is applied
        const rafId = requestAnimationFrame(() => {
          // Trigger closing animation - keep isAnimating true briefly to maintain state
          setIsClosing(true);
          // Wait for animation to complete before closing and removing classes
          timeoutId = setTimeout(() => {
            setIsAnimating(false);
            dialog.close();
            setIsClosing(false);
          }, 400); // Match animation duration
        });
        return () => {
          cancelAnimationFrame(rafId);
          if (timeoutId) clearTimeout(timeoutId);
        };
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => {
      dialog.removeEventListener("cancel", handleCancel);
    };
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className={clsx(
        styles.dialog,
        isAnimating && styles.open,
        isClosing && styles.closing,
      )}
      onClick={(e) => {
        const dialog = dialogRef.current;
        if (dialog && e.target === dialog) {
          onClose();
        }
      }}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <div className={styles.content}>{children}</div>
    </dialog>
  );
};
