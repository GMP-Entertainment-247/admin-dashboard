import { XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import Button from "../shared/Button";
import useOutsideClick from "../../utils/hooks/useOutsideClick";
import { useEffect, useRef } from "react";

interface ModalProp {
  children: React.ReactNode;
  onClose: Function;
  show: boolean;
  extraClassname?: string;
  submitClick?: Function;
  submitLoading?: boolean;
  submitText?: string;
  hideButtons?: boolean;
}

export const Modal = ({
  show,
  children,
  onClose,
  extraClassname,
  submitClick,
  submitLoading,
  submitText,
  hideButtons = false,
}: ModalProp) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick(modalRef as React.RefObject<HTMLDivElement>, () => {
    if (show) onClose();
  });
  const modalContent = (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={clsx(
            show ? "h-screen w-full" : "h-0 w-0 opacity-0",
            "fixed top-0 left-0 z-[50] bg-black-1 bg-opacity-70 flex justify-center items-center overflow-y-auto p-4"
          )}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-full max-w-[90vw] md:max-w-[650px] my-auto"
          >
            <div
              ref={modalRef}
              className={clsx(
                "bg-white rounded-lg w-full min-w-0 md:min-w-[400px] p-5",
                extraClassname
              )}
            >
              <button
                onClick={() => onClose()}
                className="float-right"
                title="Close"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
              <div>{children}</div>
              {!hideButtons && (
                <div className="flex gap-5 mt-5">
                  <Button
                    text="Cancel"
                    type="button"
                    onClick={() => onClose()}
                    extraClassName="!bg-[#E6E6E6] !text-[#1A1A1A] rounded-[8px] font-semibold"
                  />
                  <Button
                    text={submitText || "Confirm"}
                    type="button"
                    isLoading={submitLoading}
                    onClick={() => submitClick?.()}
                    extraClassName="rounded-[8px] font-semibold"
                  />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  useEffect(() => {
    if (!show) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [show, onClose]);

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
};
