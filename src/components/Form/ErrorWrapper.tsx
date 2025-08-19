import clsx from "clsx";
import { ErrorMessage, useFormikContext } from "formik";
import { useMemo } from "react";
import { flatten } from "../../utils/helpers";


export const ErrorWrapper = (props: {
  children: (arg: { hasError: boolean }) => React.ReactNode;
  show: boolean;
  name?: string;
  className?: string;
}) => {
  return (
    <div className="flex flex-col">
      {props.show && props.name ? (
        <Error name={props.name}>{props.children}</Error>
      ) : (
        props.children({ hasError: false })
      )}
      {props.show && props?.name && (
        <span
          className={clsx(
            "text-[10px] text-red-400 mt-[1px] h-3",
            props.className
          )}
        >
          <ErrorMessage name={props.name}>{(msg) => msg}</ErrorMessage>
        </span>
      )}
    </div>
  );
};

const Error = (props: {
  name: string;
  children: (arg: { hasError: boolean }) => React.ReactNode;
}) => {
  const form = useFormikContext();
  const errors = useMemo(() => flatten(form.errors), [form.errors]);
  const touches = useMemo(() => flatten(form.touched), [form.touched]);
  const error = errors[props.name];
  const touched = touches[props.name];

  return <>{props.children({ hasError: !!touched && !!error })}</>;
};
