// Types
import type { LabelProps } from "./types";
import clsx from "clsx";

const Label: React.FC<LabelProps> = ({
  id,
  required,
  children,
  labelclassName,
}) => {
  return (
    <label
      htmlFor={id}
      className={clsx(
        "flex gap-[2px] text-xs md:text-sm font-medium text-grey-normal capitalize",
        labelclassName
      )}
    >
      {required && <span className="text-red-500">*</span>}
      <p>{children}</p>
    </label>
  );
};

export default Label;
