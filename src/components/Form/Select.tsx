import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { ChevronDown, ChevronUp, X } from "lucide-react";
// Types
import { SelectProps } from "./types";

// Imports
import Label from "./Label";
import useOutsideClick from "../../utils/hooks/useOutsideClick";

const Select: React.FC<SelectProps> = ({
  id,
  name,
  label,
  value,
  required,
  className,
  placeholder = "Select",
  defaultValue,
  onChange,
  inputClassName,
  labelclassName,
  disabled,
  options = [],
}) => {
  // State for dropdown visibility
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<
    string | number | undefined
  >(value || defaultValue || undefined);

  // Reference to the select container
  const selectRef = useRef<HTMLDivElement>(null);

  // Update selectedValue when value prop changes
  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  // Handle outside click to close dropdown
  useOutsideClick(selectRef as React.RefObject<HTMLDivElement>, () =>
    setIsOpen(false)
  );

  // Handle ESC key to close dropdown
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Handle option selection
  const handleOptionSelect = (
    optionValue: string | number,
    optionLabel: string
  ) => {
    setSelectedValue(optionValue);
    setIsOpen(false);
    onChange?.(optionValue, optionLabel);
  };

  // Handle clear selection
  const handleClear = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setSelectedValue(undefined);
    onChange?.("", "");
  };

  // Get the display text for the selected option
  const getDisplayText = () => {
    if (selectedValue === undefined || selectedValue === null) {
      return placeholder;
    }

    const selectedOption = options.find(
      (option) => option.value === selectedValue
    );
    return selectedOption ? selectedOption.label : placeholder;
  };

  return (
    <div className={clsx("space-y-3", disabled && "opacity-60", className)}>
      <input
        type="hidden"
        name={name ? name : id}
        id={id}
        value={selectedValue || ""}
        required={required}
        disabled={disabled}
        className={inputClassName}
      />
      {/* Render the label if provided */}
      {label && (
        <Label id={id} required={required} labelclassName={labelclassName}>
          {label}
        </Label>
      )}

      <div className="relative" ref={selectRef}>
        {/* Select trigger container */}
        <div
          role="button"
          className={clsx(
            "p-3 md:p-4 text-xs md:text-sm font-normal rounded-lg w-full custom-primary-outline border border-solid border-[#999999] hover:border-[#00000099] transition-colors duration-300 ease-in-out flex items-center justify-between",
            {
              "cursor-not-allowed": disabled,
              "cursor-pointer": !disabled,
              "outline-auto outline-brand-500": isOpen,
            },
            inputClassName,
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <span
            className={clsx("text-left", {
              "text-gray-500": !selectedValue || selectedValue === placeholder,
              "text-black": selectedValue && selectedValue !== placeholder,
            })}
          >
            {getDisplayText()}
          </span>
          <div className="flex items-center gap-2">
            {selectedValue && selectedValue !== placeholder && (
              <button
                type="button"
                onClick={handleClear}
                className="hover:bg-gray-100 rounded-full transition-colors duration-150 cursor-pointer"
                title="Clear selection"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </div>
        </div>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-solid border-[#999999] rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {options.length === 0 ? (
              <div className="p-4 text-sm text-gray-500 text-center">
                No options available
              </div>
            ) : (
              options.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  className={clsx(
                    "w-full px-4 py-3 text-left text-xs md:text-sm hover:bg-gray-50 transition-colors duration-150",
                    {
                      "bg-gray-100": selectedValue === option.value,
                      "text-gray-900": selectedValue === option.value,
                      "text-gray-700": selectedValue !== option.value,
                    }
                  )}
                  onClick={() => handleOptionSelect(option.value, option.label)}
                >
                  {option.label}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
