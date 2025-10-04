import { useEffect, useRef } from "react";
import clsx from "clsx";
// Types
import { InputProps } from "./types";

// Imports

import Label from "./Label";

const Input: React.FC<InputProps> = ({
  id,
  name,
  label,
  value,
  required,
  className,
  // fullWidth = true,
  placeholder,
  initialValue,
  defaultValue,
  type = "text",
  onChange,
  inputClassName,
  labelclassName,
  readOnly,
  disabled,
  min,
  max,
  maxLength,
  minLength,
}) => {
  // Reference to the input element
  const inputRef = useRef<HTMLInputElement>(null);

  // Set the input's "value" to an "initial value" when component mounts or when initialValue changes
  useEffect(() => {
    if (initialValue !== undefined && onChange !== undefined) {
      onChange(initialValue);
    }
  }, [initialValue, onChange]);

  return (
    <div className={clsx("space-y-3", disabled && "opacity-60", className)}>
      {/* Render the label if provided */}
      {label && (
        <Label id={id} required={required} labelclassName={labelclassName}>
          {label}
        </Label>
      )}
      <div className="relative flex items-center">
        <input
          id={id}
          name={name ? name : id}
          value={value}
          ref={inputRef}
          required={required}
          readOnly={readOnly}
          disabled={disabled}
          placeholder={placeholder}
          defaultValue={defaultValue ? defaultValue : undefined}
          min={type === "number" ? min : undefined}
          max={type === "number" ? max : undefined}
          maxLength={maxLength}
          minLength={minLength}
          // Call onChange prop if provided when input value changes
          onChange={(event) => {
            let { value } = event.target;
            if (type === "number" && maxLength && value.length > maxLength) {
              value = value.slice(0, maxLength);
            }
            event.target.value = value;
            onChange?.(value, event);
          }}
          // Input styles
          className={clsx(
            "p-4 text-xs md:text-sm font-normal rounded-lg w-full border border-solid border-[#999999] hover:border-[#00000099] transition-colors duration-300 ease-in-out focus-within:outline-brand-500",
            {
              "cursor-not-allowed": disabled,
            },

            inputClassName
          )}
        />
      </div>
    </div>
  );
};

export default Input;
