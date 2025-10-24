import React from "react";

export interface InputProps {
  id: string;
  name?: string;
  value?: string | number | readonly string[];
  label?: string;
  // leftIcon?: string;
  labelclassName?: string;
  className?: string;
  required?: boolean;
  placeholder?: string;
  initialValue?: string;
  defaultValue?: string | null;
  type?: React.HTMLInputTypeAttribute;
  fullWidth?: boolean;
  onChange?: (
    data: string,
    event?: React.ChangeEvent<HTMLInputElement>
  ) => void;
  inputClassName?: string;
  readOnly?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
  maxLength?: number;
  minLength?: number;
}

export interface LabelProps {
  id: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
  labelclassName?: string;
}

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps {
  id: string;
  name?: string;
  value?: string | number;
  label?: string;
  labelclassName?: string;
  className?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string | number | null;
  onChange?: (value: string | number, label?: string) => void;
  inputClassName?: string;
  disabled?: boolean;
  options?: SelectOption[];
}

export interface TextAreaProps {
  id: string;
  name?: string;
  value?: string;
  label?: string;
  labelclassName?: string;
  className?: string;
  required?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  minHeight?: number;
}
